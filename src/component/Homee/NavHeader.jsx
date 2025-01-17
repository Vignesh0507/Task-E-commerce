import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
// import { IoBagHandleOutline } from "react-icons/io5";
import '../Style/HeaderStyle.css';
import '../Style/SearchStyle.css';

const NavHeader = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // Initially show 3 products

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim() === '') {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleViewMore = () => {
    setVisibleCount(prevCount => prevCount + 3); // Show 3 more products on each click
  };

  return (
    <Container className='container'>
      <div className='header'>
        <h2 className='type'>WebsiteName</h2>
        <div className='navbar'>
          <Link to='/'>Home</Link>
          <Link to='/product/data/1'>Kids</Link>
          <Link to='/product/data/2'>Womens</Link>
          <Link to='/product/data/3'>Mens</Link>
          <p onClick={() => alert('The app is under maintenance. Please check back later!')} style={{ cursor: 'pointer', color: 'blue' }}>
            Get<sup>app</sup>
          </p>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className='search'><FaSearch /></button>
          </div>
          {/* <IoBagHandleOutline /> */}
        </div>
      </div>

      {/* Display the filtered products */}
      {filteredProducts.length > 0 && (
        <>
          <Row className="search-results">
            {filteredProducts.slice(0, visibleCount).map(product => (
              <Col key={product.id} xs={12} sm={6} md={4}>
                <div className="product-card">
                  <img src={product.image} alt={product.title} className="product-image" />
                  <h5 className="product-title">{product.title}</h5>
                  <p className="product-price">${product.price}</p>
                </div>
              </Col>
            ))}
          </Row>
          {visibleCount < filteredProducts.length && (
            <div className="view-more-container">
              <button onClick={handleViewMore} className="view-more-button">View More</button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default NavHeader;
