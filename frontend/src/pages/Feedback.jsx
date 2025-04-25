import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Alert, Rating } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const validationSchema = yup.object({
  rating: yup
    .number()
    .required('Rating is required')
    .min(1, 'Please provide a rating'),
  comment: yup
    .string()
    .required('Feedback comment is required')
    .min(10, 'Comment should be of minimum 10 characters length')
});

function Feedback() {
  const [status, setStatus] = useState({ type: '', message: '' });

  const formik = useFormik({
    initialValues: {
      rating: 0,
      comment: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post('/api/feedback', values);
        if (response.data.success) {
          setStatus({
            type: 'success',
            message: 'Thank you for your feedback!'
          });
          resetForm();
        } else {
          setStatus({
            type: 'error',
            message: response.data.message || 'Failed to submit feedback'
          });
        }
      } catch (err) {
        setStatus({
          type: 'error',
          message: 'An error occurred while submitting your feedback'
        });
      }
    },
  });

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Your Feedback
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          Help us improve our Brain Tumor Detection system by sharing your experience
        </Typography>

        {status.message && (
          <Alert severity={status.type} sx={{ mb: 3 }}>
            {status.message}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Typography component="legend" gutterBottom>
              Rate your experience
            </Typography>
            <Rating
              name="rating"
              value={formik.values.rating}
              onChange={(event, newValue) => {
                formik.setFieldValue('rating', newValue);
              }}
              size="large"
            />
            {formik.touched.rating && formik.errors.rating && (
              <Typography color="error" variant="caption">
                {formik.errors.rating}
              </Typography>
            )}
          </Box>

          <TextField
            fullWidth
            id="comment"
            name="comment"
            label="Your Feedback"
            multiline
            rows={4}
            value={formik.values.comment}
            onChange={formik.handleChange}
            error={formik.touched.comment && Boolean(formik.errors.comment)}
            helperText={formik.touched.comment && formik.errors.comment}
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              size="large"
              sx={{ minWidth: 200 }}
            >
              Submit Feedback
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default Feedback;