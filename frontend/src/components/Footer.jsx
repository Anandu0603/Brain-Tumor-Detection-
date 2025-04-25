import { Box, Container, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.9)'
        }
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="body1" 
          align="center"
          sx={{
            fontWeight: 300,
            letterSpacing: '0.5px',
            opacity: 0.9,
            '&:hover': {
              opacity: 1
            }
          }}
        >
          © {new Date().getFullYear()} Brain Tumor Detection. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;