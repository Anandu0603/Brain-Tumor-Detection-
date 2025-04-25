import { useState } from 'react';
import { Container, Typography, Paper, TextField, Button, Alert, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
});

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/register', {
          name: values.name,
          email: values.email,
          password: values.password
        });
        if (response.data.success) {
          navigate('/login');
        } else {
          setError(response.data.message || 'Registration failed');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred during registration');
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 2,
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
          }
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{
            fontWeight: 600,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            mb: 4
          }}
        >
          Register
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              transition: 'opacity 0.3s ease-in-out',
              animation: 'fadeIn 0.5s ease-in-out'
            }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  '& fieldset': {
                    borderColor: 'primary.main',
                  }
                }
              }
            }}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  '& fieldset': {
                    borderColor: 'primary.main',
                  }
                }
              }
            }}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  '& fieldset': {
                    borderColor: 'primary.main',
                  }
                }
              }
            }}
          />
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  '& fieldset': {
                    borderColor: 'primary.main',
                  }
                }
              }
            }}
          />
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              size="large"
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 500,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(33, 150, 243, 0.3)'
                }
              }}
            >
              Register
            </Button>
          </Box>
        </form>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography 
            variant="body2" 
            sx={{
              color: 'text.secondary',
              '& .MuiButton-root': {
                transition: 'color 0.3s ease-in-out',
                '&:hover': {
                  color: '#21CBF3'
                }
              }
            }}
          >
            Already have an account?{' '}
            <Button 
              color="primary" 
              onClick={() => navigate('/login')}
              sx={{
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              Login here
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;