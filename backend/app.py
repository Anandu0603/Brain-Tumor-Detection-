import sys
print(sys.executable)
from flask import Flask, request, jsonify, render_template
import os
import gdown
from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from functools import wraps
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from db import db, initialize_db
from models import User, Admin, Feedback, PredictionHistory
from ai_insights import generate_medical_insights
from ai_summarizer import generate_medical_insights as gemini_summarizer

VALID_ADMIN_TOKEN = "admin-token-123"  # Define the valid admin token
app = Flask(__name__)

# Set configuration
app.config['SECRET_KEY'] = 'your-secret-key-here'  # Set a strong secret key for session management
app.config['SESSION_TYPE'] = 'filesystem'

# Initialize database
initialize_db(app)
print("Database initialized")

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Google Drive file ID of your model
GDRIVE_FILE_ID = "1aEc1Ni1mds5anu28giaiXkcM9_OOxV2y"  # Replace with your actual file ID
MODEL_PATH = "best_model.keras"

# Function to download model from Google Drive
def download_model():
    if not os.path.exists(MODEL_PATH):
        print("Downloading model from Google Drive...")
        url = f"https://drive.google.com/uc?id={GDRIVE_FILE_ID}"
        gdown.download(url, MODEL_PATH, quiet=False)
        print("Model downloaded successfully!")

# Function to load model
def load_ml_model():
    global model
    try:
        download_model()  # Ensure model is downloaded

        # Enable GPU memory growth
        physical_devices = tf.config.list_physical_devices('GPU')
        if physical_devices:
            for device in physical_devices:
                tf.config.experimental.set_memory_growth(device, True)
        
        # Load model
        model = load_model(MODEL_PATH, compile=False)
        model.compile(
            optimizer='adam',
            loss='categorical_crossentropy',
            metrics=['accuracy'],
            run_eagerly=False
        )
        
        # Warm-up the model
        dummy_input = np.zeros((1, 299, 299, 3))
        model.predict(dummy_input)
        
        print("Model loaded successfully!")
    except Exception as e:
        print(f"Error loading model: {str(e)}")

class_names = ['glioma', 'meningioma', 'notumor', 'pituitary']

def get_prediction(image):
    try:
        if model is None:
            raise ValueError("Model not loaded")
        
        # Convert image to RGB and resize
        img = image.convert('RGB')
        img = img.resize((299, 299), Image.Resampling.LANCZOS)
        
        # Convert to numpy array and normalize
        img_array = np.array(img, dtype=np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        predictions = model.predict(img_array, batch_size=1)
        predicted_class = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class])
        
        return class_names[predicted_class], confidence
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return None, None

# Load model at startup
load_ml_model()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        # Process image
        image = Image.open(file.stream)
        
        # Get prediction
        predicted_class, confidence = get_prediction(image)
        
        if predicted_class is None:
            return jsonify({'error': 'Error making prediction'}), 500
        
        # Generate Gemini summary
        gemini_summary_result = gemini_summarizer(predicted_class, confidence)
        gemini_summary = gemini_summary_result.get('ai_summary', 'Gemini summary not available.')

        return jsonify({
            'tumor_type': predicted_class,
            'confidence': confidence,
            'gemini_summary': gemini_summary
        })

    except Exception as e:
        print(f"Error in prediction route: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def api_login():
    print("Login route hit")
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        print(f"Attempting login for email: {email}")

        if not all([email, password]):
            print("Missing email or password")
            return jsonify({'message': 'Missing email or password'}), 400

        user = User.query.filter_by(email=email).first()
        if user:
            print(f"User found: {user.email}")
            if user.check_password(password):
                print("Password check successful")
                login_user(user)
                return jsonify({
                    'message': 'Login successful',
                    'user': {
                        'id': user.id,
                        'name': user.name,
                        'email': user.email,
                        'is_approved': user.is_approved
                    }
                }), 200
            else:
                print("Invalid password")
                return jsonify({'message': 'Invalid email or password'}), 401
        else:
            print("User not found")
            return jsonify({'message': 'Invalid email or password'}), 401
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({'message': 'An error occurred during login', 'error': str(e)}), 500

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not all([username, password]):
            return jsonify({'message': 'Missing username or password'}), 400

        admin = Admin.query.filter_by(username=username).first()
        if admin and admin.check_password(password):
            return jsonify({
                'message': 'Admin login successful',
                'token': VALID_ADMIN_TOKEN  # Return the valid admin token
            }), 200
        return jsonify({'message': 'Invalid admin credentials'}), 401
    except Exception as e:
        print(f"Admin login error: {str(e)}")
        return jsonify({'message': 'An error occurred during admin login', 'error': str(e)}), 500

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({'success': False, 'message': 'No authorization token provided'}), 401
        try:
            token = auth_header.split(' ')[1]
            if not token:  # Check if token is present
                return jsonify({'success': False, 'message': 'No authorization token provided'}), 401
            # Basic token validation - just check for token presence
            # In a real app, you would validate the token here (e.g., JWT validation)
            return f(*args, **kwargs)
        except Exception as e:
            print(f"Auth error: {str(e)}")
            return jsonify({'success': False, 'message': 'Invalid token'}), 401
    return decorated_function

@app.route('/api/admin/users', methods=['GET'])
@admin_required
def get_users():
    print("get_users route called!")  # Log when the route is called
    try:
        users = User.query.all()
        user_count = len(users)
        print("Fetched users count:", user_count)  # Log user count
        print("Fetched users:", users)  # Log fetched users
        users_data = [{
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'createdAt': user.created_at,
            'is_approved': user.is_approved
        } for user in users]
        return jsonify({'success': True, 'users': users_data, 'user_count': user_count}), 200
    except Exception as e:
        print(f"Error fetching users: {str(e)}")
        return jsonify({'success': False, 'message': 'Error fetching users', 'error': str(e)}), 500

@app.route('/api/admin/feedback', methods=['GET'])
@admin_required
def get_feedbacks():
    print("get_feedbacks route called!")
    try:
        feedbacks = Feedback.query.all()
        feedback_count = len(feedbacks)
        print("Fetched feedback count:", feedback_count)
        print("Fetched feedbacks:", feedbacks)
        feedbacks_data = [{
            'id': feedback.id,
            'rating': feedback.rating,
            'comment': feedback.comment,
            'createdAt': feedback.created_at,
            'user': {'name': feedback.user.name if feedback.user else 'Anonymous'} 
        } for feedback in feedbacks]
        return jsonify({'success': True, 'feedbacks': feedbacks_data, 'feedback_count': feedback_count}), 200
    except Exception as e:
        print(f"Error fetching feedbacks: {str(e)}")
        return jsonify({'success': False, 'message': 'Error fetching feedbacks', 'error': str(e)}), 500

@app.route('/api/admin/users/approve', methods=['POST'])
@admin_required
def approve_user():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        action = data.get('action')  # 'approve' or 'reject'

        if not all([user_id, action]) or action not in ['approve', 'reject']:
            return jsonify({'success': False, 'message': 'Invalid request parameters'}), 400

        user = User.query.get(user_id)
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404

        user.is_approved = (action == 'approve')
        db.session.commit()

        return jsonify({
            'success': True,
            'message': f'User successfully {action}d',
            'user_id': user_id,
            'is_approved': user.is_approved
        }), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error {action}ing user: {str(e)}")
        return jsonify({'success': False, 'message': f'Error {action}ing user', 'error': str(e)}), 500

@app.route('/api/register', methods=['POST'])
def api_register():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not all([name, email, password]):
            return jsonify({'message': 'Missing required fields'}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({'message': 'Email already registered'}), 400

        user = User(name=name, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        return jsonify({'message': 'Registration successful'}), 201
    except Exception as e:
        db.session.rollback()
        print(f"Registration error: {str(e)}") # Log the exception
        return jsonify({'message': 'An error occurred during registration', 'error': str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Call db.create_all() to create tables
    app.run(debug=True)
