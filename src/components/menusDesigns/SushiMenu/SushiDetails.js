import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { fetchProducts } from '../../../firebase/db/product';
import SkeletonComponent from '../../Global/SkeletonComponent';
import { Avatar } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: -30,
    marginLeft: -8,
  },
  innerRoot: {
    maxWidth: 450,
    width: '100%',
    minWidth: 330,
    textAlign: 'center',
    height: '100vh',
    position: 'fixed',
  },
  priceTag: {
    color: 'white',
  },
  logoDiv: {
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'black',
    width: '100%',
    maxWidth: 450,
    padding: 10,
  },
  avatar: {
    maxWidth: '100%',
    maxHeight: theme.spacing(22),
  },
  imageDiv: {
    backgroundColor: '#f7772e',
    padding: 20,
    width: 200,
    height: 200,
    display: 'flex',
    justifyContent: 'center',
  },
  ribbonNamePrice: {
    backgroundColor: '#191919',
    width: '100%',
    maxWidth: 450,
    color: '#f7772e',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 25px',
  },
  backButton: {
    backgroundColor: '#f7772e',
    color: 'white',
    width: 280,
    borderRadius: 100,
    boxShadow: 'none',
    padding: 12,
    textTransform: 'capitalize',
  },
}));

const SushiDetails = () => {
  const classes = useStyles();
  const router = useRouter();

  const [product, setProduct] = useState({});

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

          const pro = pr.filter((product) => product.id === router.query.id);
          setProduct(pro[0]);
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

  const renderImage = () => {
    return (
      <Grid item xs={12} container justify='center' alignItems='center'>
        <Grid item xs={12} className={classes.imageDiv}>
          <Avatar
            src={product?.image || '/assets/images/american/burger.png'}
            //className={classes.avatar}
            style={{ width: 160, height: 160, padding: 0 }}
          />
        </Grid>
        <Grid item xs={12} className={classes.ribbonNamePrice}>
          <Typography variant='subtitle2' style={{ fontSize: 17, width: '80%' }} align='left'>
            {product.name}
          </Typography>
          <Typography variant='subtitle2' className={classes.priceTag}>
            ${product.price}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const renderDetails = () => {
    return (
      <Grid xs={12} item container direction='column' spacing={2} style={{ padding: 40 }}>
        <Grid item xs={12}>
          <img
            onClick={() => router.push('/Allergies')}
            src='/assets/images/american/allergies_icon.png'
            width='100'
            style={{ cursor: 'pointer' }}
          />
        </Grid>
        <Grid item xs>
          <Typography variant='body1' style={{ fontSize: 12, color: 'black' }}>
            {product.description}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const renderBackButton = () => {
    return (
      <Grid item xs style={{ margin: '30px 0px 70px 0px' }}>
        <Button onClick={() => router.back()} variant='contained' className={classes.backButton}>
          Go Back
        </Button>
      </Grid>
    );
  };

  const renderSmartLogo = () => {
    return (
      <Grid item xs className={classes.logoDiv}>
        <img src='/assets/images/logo_smart.png' />
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      {loading ? (
        <>
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
        </>
      ) : (
        <div className={classes.innerRoot}>
          <Grid container direction='column' alignItems='center'>
            {renderImage()}
            {renderDetails()}
            {renderBackButton()}
            {/*{renderSmartLogo()}*/}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default SushiDetails;
