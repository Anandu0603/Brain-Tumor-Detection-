

# Brain Tumor Detection System 🧠

## Project Description
A web-based application that uses deep learning to detect brain tumors from MRI scans. The system classifies into four categories: glioma, meningioma, pituitary, and no tumor. And based on classification AI analyse and give real time updates based on alaysis report ....

## Features ✨
- **Instant Analysis**: Immediate results upon MRI scan upload
- **High Accuracy**: Utilizes advanced deep learning model
- **User-Friendly Interface**: Simple and interactive UI
- **Real-Time Preview**: Instant preview of uploaded images
- **Reliable Results**: Confidence score with each prediction

## Tech Stack 🛠️
- **Frontend**: HTML, CSS, JavaScript,react
- **Backend**: Flask (Python)
- **Deep Learning**: TensorFlow
- **Image Processing**: PIL, NumPy
- **Deployment**: Render
-**generative ai**:gemini

## Installation & Setup 🚀

### Requirements
```bash
pip install -r requirements.txt
plese ensure you have node js and flask installed in your pc
plese install vite for smooth running on react components 
to run your backend :py app.py
to run your frontend :npm run dev;
```

### requirements.txt
```
tensorflow==2.13.0
numpy==1.21.0
Pillow==9.0.0
flask==2.0.1
gunicorn==20.1.0
```

### To Run Locally
```bash
python app.py
```

## Project Structure 📁
```
brain-tumor-detection/
├── app.py
├── requirements.txt
├── model/
│   └── best_model.keras
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
├── templates/
│   └── index.html
└── README.md
```

## Usage 💡
1. Visit the website
2. Click "Upload" button or drag-and-drop an image
3. Click "Predict" button
4. View results and confidence score

## Deployment 🌐
This application is hosted on Render. For deployment:
- Create a new web service on Render
- Connect GitHub repository
- Build Command: `pip install -r requirements.txt`
- Start Command: `gunicorn app:app`

## Developer 👨‍💻
**Anandu Suresh**
- [LinkedIn](https://www.linkedin.com/in/anandu-suresh-1ba561213)
- [GitHub](https://https://github.com/Anandu0603)

## License 📝
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Note
This project is for educational purposes only and should not be used as the sole tool for medical diagnosis.

## Contributing 🤝
Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments 🙏
- Thanks to all contributors who helped in building this project
- Special thanks to the medical imaging community for providing datasets
- Inspired by the need for accessible medical diagnostic tools



## Screenshots
![Screenshot (84)](https://github.com/user-attachments/assets/dfd75714-ba17-482c-9113-70e33e3b03ae)
![Screenshot (77)](https://github.com/user-attachments/assets/5b70a124-e696-4cc7-a95b-a161b338e592)
![Screenshot (72)](https://github.com/user-attachments/assets/24d1e9c2-ca12-4e9a-8910-ca7ab7e0ab2a)
![Screenshot (69)](https://github.com/user-attachments/assets/aac4c012-cf8a-4584-b75f-24bee8adc8c8)



