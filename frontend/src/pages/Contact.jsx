import { useState } from 'react';
import { Container, Typography, Paper, Grid, TextField, Button, Alert, Box, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required')
});

function Contact() {
  const [status, setStatus] = useState({ type: '', message: '' });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post('/api/contact', values);
        if (response.data.success) {
          setStatus({
            type: 'success',
            message: 'Thank you for your message. We will get back to you soon!'
          });
          resetForm();
        } else {
          setStatus({
            type: 'error',
            message: response.data.message || 'Failed to send message'
          });
        }
      } catch (err) {
        setStatus({
          type: 'error',
          message: 'An error occurred while sending your message'
        });
      }
    },
  });

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
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
          Contact Us
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          align="center" 
          sx={{ 
            mb: 4,
            color: 'text.secondary',
            fontSize: '1.1rem'
          }}
        >
          Have questions about our Brain Tumor Detection system? We're here to help!
        </Typography>

        {status.message && (
          <Alert 
            severity={status.type} 
            sx={{ 
              mb: 3,
              transition: 'opacity 0.3s ease-in-out',
              animation: 'fadeIn 0.5s ease-in-out'
            }}
          >
            {status.message}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="subject"
                name="subject"
                label="Subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="message"
                name="message"
                label="Message"
                multiline
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
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
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              size="large"
              sx={{
                minWidth: 200,
                py: 1.5,
                px: 4,
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
              Send Message
            </Button>
          </Box>
        </form>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1
            }}
          >
            You can also reach us at{' '}
            <Link 
              href="mailto:support@braintumordetection.com" 
              color="primary"
              sx={{
                textDecoration: 'none',
                transition: 'color 0.3s ease-in-out',
                '&:hover': {
                  color: '#21CBF3'
                }
              }}
            >
              support@braintumordetection.com
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Contact;