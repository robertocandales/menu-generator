import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import _ from 'lodash';
import { Paper, Grid, Avatar } from '@material-ui/core';
import { fetchProducts } from '../../../../firebase/db/product';
import SkeletonComponent from '../../../Global/SkeletonComponent';

const List = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage?.getItem('user'));

    const fetchProductsFromDB = () => {
      fetchProducts()
        .then((snapshot) => {
          let items = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          const pr = items.filter((x) => x.user === user.email);

          setProducts(pr);
          setLoading(false);
        })
        .catch((er) => {
          console.log('error');
          console.log(er);
          setLoading(false);
        });
    };
    fetchProductsFromDB();
  }, []);
  return (
    <div style={{ width: '100%' }}>
      <Grid container direction='row' justify='center' alignItems='center' item spacing={2}>
        {loading ? (
          <Grid item sm={12} style={{ width: '100%', height: '100%' }}>
            {' '}
            <SkeletonComponent />
            <SkeletonComponent />
            <SkeletonComponent />
            <SkeletonComponent />
            <SkeletonComponent />
          </Grid>
        ) : (
          products.map((product, i) => (
            <div key={i} style={{ width: '100%' }}>
              {product.isVisibleDigitalMenu ? (
                <Paper
                  elevation={3}
                  style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                    marginTop: '5px',
                    marginBottom: '5px',
                  }}>
                  <Grid
                    container
                    direction='row'
                    justify='flex-start'
                    alignItems='center'
                    item
                    spacing={3}>
                    <Grid item sm={2}>
                      <Avatar alt={product.name} src={product.image} />{' '}
                    </Grid>{' '}
                    <Grid item sm={6}>
                      {product.name}
                    </Grid>
                  </Grid>
                </Paper>
              ) : null}
            </div>
          ))
        )}
      </Grid>
    </div>
  );
};

export default List;
