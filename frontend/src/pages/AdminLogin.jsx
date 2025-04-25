import { useState } from 'react';
import { Container, Typography, Paper, TextField, Button, Alert, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
});

function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/admin/login', values);
        if (response.status === 200) {
          localStorage.setItem('adminToken', response.data.token);
          navigate('/admin/dashboard');
        } else {
          setError('Invalid administrator credentials');
        }
      } catch (error) {
        setError('An error occurred during login');
        console.error('Admin login error:', error);
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
          Administrator Login
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
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
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
              Login as Administrator
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default AdminLogin;
