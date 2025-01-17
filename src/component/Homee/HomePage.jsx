import React from 'react';
import { Grid2, Card, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import NavHeader from './NavHeader';
import Footer from './Footer';
import '../Style/StyleHome.css'
import img1 from '/src/assets/images/1.jpg';
import img2 from '/src/assets/images/2.jpg';
import img3 from '/src/assets/images/3.avif';
import { Button, Container } from 'react-bootstrap';
import year from '/src/assets/images/newyear.webp'
import xmas from '/src/assets/images/11.webp'
import End from '/src/assets/images/15.webp'
import Countdown from './Countdown.jsx/Countdown';
import { GoArrowDownRight } from "react-icons/go";
const HomePage = () => {
  const images = [
    { src: img1, id: '1', title: `Kids` },
    { src: img2, id: '2', title: 'Mens' },
    { src: img3, id: '3', title: 'Womens' },  
  ];

  return (
    <Container style={{ position: 'relative', top: '140px' ,padding:"5px"}}>
      <NavHeader></NavHeader>
      <div className='end'> 
        <h1>It's the biggest sale of the year!</h1> 
      </div>
      <br/>
      <Countdown/>
      <br/>
      <Grid2 container spacing={2} justifyContent="center">
        <br/>
        <img src={year} alt="a" style={{height:"300px",width:"100%"}}/>
       <p className="shop-text">Shop <GoArrowDownRight /></p>

        {images.map((image) => (
          <Grid2 item key={image.id} xs={12} sm={6} md={4}>
            <br/><br/>
            <Card>
              <Link to={`/product/data/${image.id}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                  component="img"
                  alt={image.title}
                  height="200"
                  image={image.src}
                  title={image.title}
                />
                <Typography variant="h6" align="center">
                  {image.title}
                </Typography>
              </Link>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      
      <br/>
      <br/><br/>
      <span>
        <img src={xmas} alt="a" style={{height:"300px",width:"60%"}}/>
      <img src={End} alt="b" style={{height:"300px",width:"40%"}}/>
     </span>
      <Footer></Footer>
    </Container>
  );
};

export default HomePage;
