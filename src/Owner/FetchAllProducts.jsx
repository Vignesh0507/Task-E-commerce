import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Button,
  Modal,
  TextField,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { blue, pink, yellow, purple } from '@mui/material/colors';
import axios from 'axios';
import NavHeader from '../component/Homee/NavHeader';
import SkeletonLoader from '../context/SkeletonLoader';

const FetchAllProducts = () => {
  const [menProducts, setMenProducts] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
  });

  const menUrl = "https://fakestoreapi.com/products?category=men";
  const womenUrl = "https://fakestoreapi.com/products?category=women";
  const allUrl = "https://fakestoreapi.com/products";


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menResponse, womenResponse, allResponse] = await Promise.all([
          axios.get(menUrl),
          axios.get(womenUrl),
          axios.get(allUrl),
        ]);
        setMenProducts(menResponse.data);
        setWomenProducts(womenResponse.data);
        setAllProducts(allResponse.data);
        setFilteredProducts(allResponse.data);
      } catch (error) {
        setError('Error fetching the products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading state while data is being fetched
  if (loading) {
    return (
     <SkeletonLoader></SkeletonLoader>
    );
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle the search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredProducts(allProducts); // Show all products when query is empty
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(lowercasedQuery) ||
        product.description.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(filtered);
    }
  };

  // Handle view details
  const handleViewDetails = (product) => {
    setProductDetails(product);
    setViewDetailsOpen(true);
  };

  // Handle close view details modal
  const handleCloseViewDetails = () => {
    setViewDetailsOpen(false);
    setProductDetails(null);
  };

  // Handle delete product
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${productId}`);
      const updatedProducts = allProducts.filter((product) => product.id !== productId);
      setAllProducts(updatedProducts);
      setFilteredProducts(updatedProducts); // Update filtered products
    } catch (error) {
      setError('Error deleting the product');
    }
  };

  // Handle edit product
  const handleEditProduct = (product) => {
    setEditProduct(product);
    setEditModalOpen(true);
  };

  // Handle save edited product
  const handleSaveEdit = async () => {
    try {
      await axios.put(`https://fakestoreapi.com/products/${editProduct.id}`, editProduct);
      const updatedProducts = allProducts.map((product) =>
        product.id === editProduct.id ? editProduct : product
      );
      setAllProducts(updatedProducts);
      setFilteredProducts(updatedProducts); // Update filtered products
      setEditModalOpen(false);
    } catch (error) {
      setError('Error editing the product');
    }
  };

  // Handle adding a new product
  const handleAddProduct = async () => {
    try {
      const response = await axios.post("https://fakestoreapi.com/products", newProduct);
      setAllProducts([...allProducts, response.data]);
      setFilteredProducts([...allProducts, response.data]);
      setAddProductModalOpen(false);
      setNewProduct({
        title: '',
        description: '',
        price: '',
        image: '',
      });
    } catch (error) {
      setError('Error adding the product');
    }
  };

  return (
    <div>
      {/* Home Button */}
      <NavHeader></NavHeader>
      

      {/* Add Product Button */}
      <Box sx={{ position: 'absolute', top: 120, right: 10,display: 'flex', justifyContent: 'flex-end', my: 2 }}>
        <Button sx={{}} variant="contained" color="primary" onClick={() => setAddProductModalOpen(true)}>
          Add Product
        </Button>
      </Box>

      {/* Search Input */}
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 ,pt:13 }}>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          sx={{ width: '50%' }}
        />
      </Box>

      {/* Search Results Section */}
      {searchQuery && (
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', mt: 4, mb: 2, fontWeight: 'bold', color: blue[700] }}
        >
          Search Results for "{searchQuery}"
        </Typography>
      )}

      {/* All Products Section */}
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', mt: 4, mb: 2, fontWeight: 'bold', color: blue[700] }}
      >
        All Products
      </Typography>
      <Grid container spacing={3} sx={{ px: 4 }}>
  {filteredProducts.map((product) => (
    <Grid item xs={12} sm={6} md={3} key={product.id}>
      <Card
        sx={{
          backgroundColor: yellow[50],
          borderRadius: '16px',
          boxShadow: 5,
          height: '100%', // Ensure cards stretch to match the tallest card
          display: 'flex',
          flexDirection: 'column', // Stack items vertically
        }}
      >
        <CardMedia
          component="img"
          alt={product.title}
          height="200"
          image={product.image}
          title={product.title}
          sx={{ objectFit: 'contain', borderRadius: '16px 16px 0 0' }}
        />
        <CardContent sx={{ flexGrow: 1 }}> {/* Allows content to stretch */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: purple[600] }}>
            {product.title.slice(0, 50)}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            {product.description.slice(0, 50)}...
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: pink[500] }}>
            ${product.price}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
            p: 2,
          }}
        >
          <Button
            sx={{ color: 'white', backgroundColor: '#6495ed', m: 1 }}
            onClick={() => handleViewDetails(product)}
          >
            View Details
          </Button>
          <Button
            sx={{ color: 'white', backgroundColor: 'red', m: 1 }}
            onClick={() => handleDeleteProduct(product.id)}
          >
            Delete
          </Button>
          <Button
            sx={{ color: 'white', backgroundColor: '#708090', m: 1 }}
            onClick={() => handleEditProduct(product)}
          >
            Edit
          </Button>
        </Box>
      </Card>
    </Grid>
  ))}
</Grid>


      {/* Add Product Modal */}
      <Modal open={addProductModalOpen} onClose={() => setAddProductModalOpen(false)}>
        <Box sx={{ ...modalStyle, width: '80%', maxWidth: '500px' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Add New Product
          </Typography>
          <TextField
            label="Title"
            fullWidth
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Price"
            fullWidth
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Image URL"
            fullWidth
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleAddProduct}>
              Add
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setAddProductModalOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* View Details Modal */}
      <Modal open={viewDetailsOpen} onClose={handleCloseViewDetails}>
        <Box sx={{ ...modalStyle, width: '80%', maxWidth: '500px' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {productDetails?.title}
          </Typography>
          <Typography variant="body1">{productDetails?.description}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Price: ${productDetails?.price}
          </Typography>
        </Box>
      </Modal>

      {/* Edit Product Modal */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box sx={{ ...modalStyle, width: '80%', maxWidth: '500px' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Edit Product
          </Typography>
          <TextField
            label="Title"
            fullWidth
            value={editProduct?.title || ''}
            onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            value={editProduct?.description || ''}
            onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Price"
            fullWidth
            value={editProduct?.price || ''}
            onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleSaveEdit}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

// Modal styling
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default FetchAllProducts;
