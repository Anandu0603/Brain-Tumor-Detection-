import { Container, Typography, Paper, Grid, Box } from '@mui/material';
import { BarChart, Psychology, Speed, Security } from '@mui/icons-material';

function Home() {
  const features = [
    {
      icon: <Psychology sx={{ fontSize: 40 }} />,
      title: 'Advanced AI Detection',
      description: 'Utilizing state-of-the-art deep learning models for accurate brain tumor detection'
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Instant Analysis',
      description: 'Get immediate results upon MRI scan upload with real-time processing'
    },
    {
      icon: <BarChart sx={{ fontSize: 40 }} />,
      title: 'High Accuracy',
      description: 'Achieve reliable results with our highly trained neural network model'
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Secure Platform',
      description: 'Your medical data is protected with enterprise-grade security measures'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          Advanced Braintumor Detection using AI
        </Typography>
        <Typography
          variant="h5"
          color="white"
          sx={{ mb: 4, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
        >
          Advanced AI-powered detection for accurate and rapid diagnosis
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {feature.icon}
              </Box>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                {feature.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mt={8} textAlign="center">
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          Why Choose Our Platform?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: 800,
            mx: 'auto',
            color: 'white',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          Our brain tumor detection system combines cutting-edge artificial intelligence
          with user-friendly interface to provide healthcare professionals with a powerful
          diagnostic tool. With high accuracy rates and instant results, we're helping to
          make early detection more accessible and reliable.
        </Typography>
      </Box>

      <Box mt={6} textAlign="center" sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        p: 3,
        borderRadius: 2,
        animation: 'pulse 2s infinite',
        '@keyframes pulse': {
          '0%': { opacity: 1 },
          '50%': { opacity: 0.7 },
          '100%': { opacity: 1 }
        }
      }}>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            color: 'white',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          Important Medical Disclaimer
        </Typography>
        <Typography
          variant="body2"
          sx={{
            maxWidth: 800,
            mx: 'auto',
            color: 'white',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          This is an AI-powered diagnostic support tool for healthcare professionals only:
          • Not a replacement for professional medical judgment
          • Accuracy varies based on scan quality and conditions
          • For licensed healthcare professionals with neurological training only
          • Compliant with HIPAA guidelines for data security
          • Must be used as part of comprehensive diagnostic approach
          • Healthcare providers maintain full responsibility for decisions
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;