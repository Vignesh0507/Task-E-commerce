import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Box,
  CircularProgress,
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Link,
} from '@mui/material';
import Footer from '../Homee/Footer';
import { blue, pink, yellow, purple, green } from '@mui/material/colors';
import axios from 'axios';  // Import axios
import NavHeader from '../Homee/NavHeader';
import SkeletonLoader from '../../context/SkeletonLoader';

// Mock API URL
const url = "https://fakestoreapi.com/products?category=men";

const FetchMaleClothing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchMaleClothing = async () => {
      try {
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        setError(error.message || 'Error fetching the products');
      } finally {
        setLoading(false);
      }
    };

    fetchMaleClothing();
  }, []);

  if (loading) {
    return (
      <SkeletonLoader/>
    );
  }

  if (error) return <div>Error: {error}</div>;

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <NavHeader products={products} />
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', mt: 4, mb: 2, fontWeight: 'bold', color: blue[700] ,pt:13 }}
      >
        Men's Clothing
      </Typography>
      <Grid container spacing={3} sx={{ px: 4}}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card
              sx={{
                backgroundColor: yellow[50],
                borderRadius: '16px',
                boxShadow: 5,
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s ease-in-out',
                height: 'auto',
                minHeight: '500px',
                '&:hover': { boxShadow: 15, transform: 'scale(1.03)' },
              }}
            >
              <CardMedia
                component="img"
                alt={product.title}
                height="250"
                image={product.image}
                title={product.title}
                sx={{
                  objectFit: 'contain',
                  borderRadius: '16px 16px 0 0',
                  backgroundColor: 'white',
                }}
              />
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  height: '100%',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: purple[600],
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    fontSize: '1.1rem',
                  }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    mb: 2,
                    height: '4rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {product.description.slice(0, 100)}...
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: pink[500], fontSize: '1.2rem' }}>
                  ${product.price}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                      '&:hover': { borderColor: blue[700], backgroundColor: blue[50] },
                    }}
                    fullWidth
                    onClick={() => handleOpen(product)}
                  >
                    <Link
                      href="#"
                      sx={{
                        color: blue[700],
                        textDecoration: 'none',
                        '&:hover': { color: blue[900] },
                      }}
                    >
                      View Details
                    </Link>
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      backgroundColor: green[500],
                      '&:hover': { backgroundColor: green[700] },
                    }}
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for product details */}
      {selectedProduct && (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedProduct.title}</DialogTitle>
          <DialogContent>
            <CardMedia
              component="img"
              alt={selectedProduct.title}
              height="300"
              image={selectedProduct.image}
              sx={{ objectFit: 'contain', mb: 2 }}
            />
            <Typography variant="body1" color="textPrimary" sx={{ mb: 2 }}>
              {selectedProduct.description}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: pink[500], mt: 2 }}>
              Price: ${selectedProduct.price}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: purple[600], mt: 1 }}>
              Rating: {selectedProduct.rating.rate} ({selectedProduct.rating.count} reviews)
            </Typography>
            <Rating
              value={selectedProduct.rating.rate}
              precision={0.5}
              readOnly
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button variant="contained" color="secondary">
              Add to Cart
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Footer placed at the bottom */}
      <Box sx={{ mt: 4 }}>
        <Footer />
      </Box>
    </div>
  );
};

export default FetchMaleClothing;
