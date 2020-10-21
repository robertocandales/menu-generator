import React from 'react';
import { Grid, Paper, TextField } from '@material-ui/core';
import CategoriesList from './CategoriesList/CategoriesList';
import ProductList from './ProductList/ProductList';

const CategoriesAndProductsList = ({
  setVisibleCategories,
  setVisibleProducts,
  visibleCategories,
  visibleProducts,
}) => {
  const [subCategories, setSubCategories] = React.useState([]);
  return (
    <Grid
      item
      container
      direction='row'
      justify='center'
      alignItems='stretch'
      spacing={2}
      style={{ minHeight: '550px' }}>
      <Grid item sm={6} xs={12}>
        <Paper
          elevation={3}
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '10px',
          }}>
          <CategoriesList
            setVisibleCategories={setVisibleCategories}
            visibleCategories={visibleCategories}
            setSubCategories={setSubCategories}
          />
        </Paper>
      </Grid>
      <Grid item sm={6} xs={12}>
        {' '}
        <Paper
          elevation={3}
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '10px',
          }}>
          <ProductList
            setVisibleProducts={setVisibleProducts}
            subCategories={subCategories}
            visibleProducts={visibleProducts}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CategoriesAndProductsList;
