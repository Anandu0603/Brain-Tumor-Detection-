import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a73e8',
    },
    secondary: {
      main: '#124e9e',
    },
    background: {
      default: 'transparent',
      paper: 'rgba(255, 255, 255, 0.9)',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'url("/background.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;