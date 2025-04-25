import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/login', values);
        if (response.status === 200) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          window.location.href = 'http://localhost:5000'; // Redirect to backend
        } else {
          setError('Invalid credentials');
        }
      } catch (error) {
        setError('An error occurred during login');
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
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
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(144, 238, 144, 0.6)',
                  borderWidth: '2px'
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(144, 238, 144, 0.4)'
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
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(144, 238, 144, 0.6)',
                  borderWidth: '2px'
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(144, 238, 144, 0.4)'
                }
              }
            }}
          />
          <Box sx={{ mt: 3 }}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              size="large"
            >
              Login
            </Button>
          </Box>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Button color="primary" onClick={() => navigate('/register')}>
              Register here
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
