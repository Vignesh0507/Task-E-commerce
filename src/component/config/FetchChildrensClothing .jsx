import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from '@mui/material';
import Footer from '../Homee/Footer';
import { blueGrey, grey, teal } from '@mui/material/colors';
import axios from 'axios'; // Importing axios for fetching data
import NavHeader from '../Homee/NavHeader'; // Importing NavHeader
import SkeletonLoader from '../../context/SkeletonLoader';


const url = 'https://fakestoreapi.com/products';

const FetchChildrensClothing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchChildrensClothing = async () => {
      try {
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        setError(error.message || 'Error fetching the products');
      } finally {
        setLoading(false);
      }
    };

    fetchChildrensClothing();
  }, []);

  if (loading) return <SkeletonLoader/>;
  if (error) return <div>{error}</div>;

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Box sx={{ pt: 15 }}>
      <NavHeader products={products} />
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          mt: 4,
          mb: 2,
          fontWeight: 'bold',
          color: teal[600],
        }}
      >
        Children's Clothing
      </Typography>
      <Grid container spacing={4} sx={{ px: 4 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                backgroundColor: blueGrey[50],
                borderRadius: 2,
                boxShadow: 4,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 8,
                },
              }}
            >
              <CardMedia
                component="img"
                alt={product.title}
                height="200"
                image={product.image}
                sx={{
                  objectFit: 'contain',
                  borderRadius: '8px 8px 0 0',
                  backgroundColor: grey[200],
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: grey[800],
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  color={grey[600]}
                  sx={{
                    mb: 2,
                    height: '3rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {product.description.slice(0, 100)}...
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', color: teal[500], mb: 2 }}
                >
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    backgroundColor: teal[500],
                    '&:hover': {
                      backgroundColor: teal[700],
                    },
                  }}
                  onClick={() => handleOpen(product)} // View product details
                >
                  View Details
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{
                    backgroundColor: teal[600],
                    '&:hover': {
                      backgroundColor: teal[800],
                    },
                    mt: 2,
                  }}
                  // Add to cart button without the cart state management
                >
                  Add to Cart
                </Button>
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
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: teal[500], mt: 2 }}>
              Price: ${selectedProduct.price}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: grey[700], mt: 1 }}>
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
            <Button
              variant="contained"
              color="secondary"
              // Add to cart button without the cart state management
            >
              Add to Cart
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Footer />
    </Box>
  );
};

export default FetchChildrensClothing;
