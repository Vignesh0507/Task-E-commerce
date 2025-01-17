import React from 'react';
import { Grid, Card, Skeleton, Box, AppBar, Toolbar } from '@mui/material';

const SkeletonLoader = () => {
  return (
    <>
      {/* Skeleton for NavHeader */}
      <AppBar position="sticky" sx={{ backgroundColor: '#c0c0c0',borderRadius:"15px" }}>
        <Toolbar>
          <Skeleton variant="rectangular" width={120} height={40} sx={{ marginRight: 2 }} />
          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
            <Skeleton variant="text" width={80} sx={{ marginRight: 2 }} />
            <Skeleton variant="text" width={80} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Skeleton for Product Cards */}
      <Grid container spacing={4} sx={{ px: 4, pt: 4 }}>
        {Array.from(new Array(8)).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
                boxShadow: 4,
                padding: 2,
              }}
            >
              <Skeleton variant="rectangular" width="100%" height={200} />
              <Box sx={{ mt: 2 }}>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="40%" />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SkeletonLoader;
