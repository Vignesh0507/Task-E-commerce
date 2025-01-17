import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import Footer from '../Homee/Footer';
import { blue, pink, yellow, orange } from '@mui/material/colors';
import axios from 'axios'; // Import axios
import NavHeader from '../Homee/NavHeader';
import SkeletonLoader from '../../context/SkeletonLoader';

// Mock API URL
const url = "https://fakestoreapi.com/products?category=women";

const FetchFemaleClothing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  

  useEffect(() => {
    const fetchFemaleClothing = async () => {
      try {
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        setError(error.message || 'Error fetching the products');
      } finally {
        setLoading(false);
      }
    };

    fetchFemaleClothing();
  }, []);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  if (loading) return <SkeletonLoader/>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <NavHeader products={products}></NavHeader>
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', mt: 4, mb: 2, fontWeight: 'bold', color: blue[700], pt: 12 }}
      >
        Women's Clothing
      </Typography>
      <Grid container spacing={4} sx={{ px: 4, justifyContent: 'center' }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ backgroundColor: yellow[50], borderRadius: 2, boxShadow: 4 }}>
              <CardMedia
                component="img"
                alt={product.title}
                height="250"
                image={product.image}
                sx={{ objectFit: 'contain', borderRadius: '8px 8px 0 0', backgroundColor: blue[50] }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', color: orange[600], textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 2, height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {product.description}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', color: pink[500], mb: 2 }}
                >
                  ${product.price}
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleOpen(product)}
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  View Details
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ backgroundColor: orange[500], '&:hover': { backgroundColor: orange[700] } }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Footer></Footer>

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
            <DialogContentText>
              <Typography variant="body1" color="textPrimary">
                {selectedProduct.description}
              </Typography>
            </DialogContentText>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: pink[500], mt: 2 }}>
              Price: ${selectedProduct.price}
            </Typography>
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
    </div>
  );
};

export default FetchFemaleClothing;
