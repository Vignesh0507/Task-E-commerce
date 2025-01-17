import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaApplePay,
} from 'react-icons/fa';
import { teal, grey } from '@mui/material/colors';
import { Link as RouterLink } from 'react-router-dom'

const Footer = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [infoDialogContent, setInfoDialogContent] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePaymentDialogOpen = (method) => {
    setPaymentMethod(method);
    setOpenDialog(true);
  };

  const handlePaymentSubmit = () => {
    console.log('Payment Submitted:', cardDetails);
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  
  const handleInfoDialogOpen = (content) => {
    setInfoDialogContent(content);
    setInfoDialogOpen(true);
  };

  const handleInfoDialogClose = () => {
    setInfoDialogOpen(false);
  };

  // Handle link click events
  const handleLinkClick = (linkName) => {
    let content = '';
    switch (linkName) {
      case 'Home':
        content = 'Welcome to our homepage!';
        break;
      case 'Cart':
        content = 'Your cart is empty.';
        break;
      case 'About Us':
        content = 'We are an online shopping platform dedicated to offering high-quality products.';
        break;
      case 'Contact Us':
        content = 'You can contact us at support@example.com.';
        break;
      default:
        content = 'Link not found!';
    }
    handleInfoDialogOpen(content);
  };

  return (
    <Box sx={{ backgroundColor: grey[900], color: 'white', py: 6, mt: 5,width:'100%' }}>
      {/* Time on the Left and Owner Button on the Right */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 4,
          mb: 4,
        }}
      >
        {/* Current Time */}
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Current Time:
          </Typography>
          <Typography variant="body2">{currentTime.toLocaleString()}</Typography>
        </Box>

        {/* Owner Button */}
        <Box>
          <Button component={RouterLink} to="/fetch-all-products" variant="contained" color="primary"  >
            Owner
          </Button>
        </Box>
      </Box>

      {/* Footer Content */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Box>
              <Link
                href="#"
                color="inherit"
                sx={{ display: 'block', mb: 1 }}
                onClick={() => handleLinkClick('Home')}
              >
                Home
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ display: 'block', mb: 1 }}
                onClick={() => handleLinkClick('Cart')}
              >
                Cart
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ display: 'block', mb: 1 }}
                onClick={() => handleLinkClick('About Us')}
              >
                About Us
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ display: 'block', mb: 1 }}
                onClick={() => handleLinkClick('Contact Us')}
              >
                Contact Us
              </Link>
            </Box>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Customer Service
            </Typography>
            <Box>
              <Link
                href="#"
                color="inherit"
                sx={{ display: 'block', mb: 1 }}
                onClick={() =>
                  handleInfoDialogOpen(
                    'Our shipping policies ensure timely delivery. We provide tracking details and prioritize the safe delivery of your orders. Standard shipping usually takes 3-5 business days.'
                  )
                }
              >
                Shipping Information
              </Link>
              <Link
                href="#"
                color="inherit"
                sx={{ display: 'block', mb: 1 }}
                onClick={() =>
                  handleInfoDialogOpen(
                    'Your privacy is important to us. We ensure that all personal information is stored securely and not shared with third parties. For full details, read our Privacy Policy.'
                  )
                }
              >
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          {/* About Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              We are an online shopping platform dedicated to offering high-quality products at
              affordable prices.
            </Typography>
            <Typography variant="body2">
              Our mission is to help customers find what they need and provide a seamless online
              shopping experience.
            </Typography>
          </Grid>

          {/* Payment Methods */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Payment Methods
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <IconButton color="inherit" onClick={() => handlePaymentDialogOpen('Visa')}>
                <FaCcVisa size={40} />
              </IconButton>
              <IconButton color="inherit" onClick={() => handlePaymentDialogOpen('MasterCard')}>
                <FaCcMastercard size={40} />
              </IconButton>
              <IconButton color="inherit" onClick={() => handlePaymentDialogOpen('PayPal')}>
                <FaPaypal size={40} />
              </IconButton>
              <IconButton color="inherit" onClick={() => handlePaymentDialogOpen('ApplePay')}>
                <FaApplePay size={40} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Social Media Links */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Follow Us
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            <IconButton color="inherit" href="https://www.facebook.com" target="_blank">
              <FaFacebook size={40} />
            </IconButton>
            <IconButton color="inherit" href="https://www.instagram.com" target="_blank">
              <FaInstagram size={40} />
            </IconButton>
            <IconButton color="inherit" href="https://www.twitter.com" target="_blank">
              <FaTwitter size={40} />
            </IconButton>
            <IconButton color="inherit" href="https://www.youtube.com" target="_blank">
              <FaYoutube size={40} />
            </IconButton>
          </Box>
        </Box>

        {/* Shopping Description */}
        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: teal[500], mb: 2 }}>
            Shop with Confidence!
          </Typography>
          <Typography variant="body2" sx={{ maxWidth: '800px', margin: '0 auto' }}>
            We offer a wide selection of high-quality products from trusted brands. Whether you are
            looking for the latest fashion trends or home essentials, we have something for
            everyone. Enjoy fast shipping, easy returns, and secure payments. Shop now and
            experience the convenience of online shopping with us!
          </Typography>
        </Box>

        {/* Footer Bottom Section */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} YourCompanyName. All Rights Reserved.
          </Typography>
        </Box>
      </Container>

      {/* Dialog for showing Payment Form */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{`Payment with ${paymentMethod}`}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Please enter your payment details below.
          </Typography>
          <TextField
            label="Card Number"
            variant="outlined"
            fullWidth
            margin="normal"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleChange}
            inputProps={{ maxLength: 16 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Expiry Date (MM/YY)"
                variant="outlined"
                fullWidth
                margin="normal"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleChange}
                inputProps={{ maxLength: 5 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CVV"
                variant="outlined"
                fullWidth
                margin="normal"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleChange}
                inputProps={{ maxLength: 3 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePaymentSubmit} color="primary">
            Submit Payment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Information Popup */}
      <Dialog open={infoDialogOpen} onClose={handleInfoDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Information</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{infoDialogContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInfoDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Footer;
