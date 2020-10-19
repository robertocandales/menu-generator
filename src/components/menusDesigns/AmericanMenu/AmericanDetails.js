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
    color: 'white',
    marginTop: -30,
  },
  innerRoot: {
    maxWidth: 450,
    width: '100%',
    minWidth: 330,
    textAlign: 'center',
    height: '100vh',
    backgroundImage: "url('/assets/images/american/americanbg.png')",
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    paddingTop: 40,
    position: 'fixed',
    marginLeft: -8,
  },
  priceDiv: {
    backgroundImage: "url('/assets/images/american/price_bg.png')",
    width: 55,
    height: 25,
    backgroundRepeat: 'no-repeat',
    paddingTop: 2,
  },
  priceTag: {
    fontSize: 15,
    color: 'orange',
    fontWeight: 'bold',
  },
  logoDiv: {
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'black',
    width: '100%',
    maxWidth: 450,
    padding: 10,
  },
  imageDiv: {
    backgroundColor: 'white',
    borderRadius: 200,
    padding: 15,
    width: 200,
    height: 200,
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  productName: {
    fontSize: 16,
    color: 'orange',
    fontWeight: 'bolder',
    marginBottom: 5,
    width: '100%',
  },
  backButton: {
    backgroundColor: '#ffae04',
    color: 'white',
    borderRadius: 100,
    width: 250,
    textTransform: 'capitalize',
    padding: 10,
  },
}));

const AmericanDetails = () => {
  const classes = useStyles();
  const router = useRouter();

  const [product, setProduct] = useState({});
  const [data, setData] = useState({});
  console.log(data);
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

          setData(pr);
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
      <Grid item container xs={12} justify='center'>
        <Grid item className={classes.imageDiv}>
          <Avatar
            src={product?.image || '/assets/images/american/burger.png'}
            className={classes.avatar}
            style={{ width: 150, height: 180 }}
          />
          {/*<img
            alt='product'
            src={product.image || '/assets/images/american/burger.png'}
            className={classes.avatar}
          />*/}
        </Grid>
        <Grid item xs>
          <Typography variant='h5' style={{ color: 'orange', letterSpacing: '0.1em' }}>
            .................................
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const renderDetails = () => {
    return (
      <Grid
        xs={12}
        item
        container
        direction='row'
        alignItems='flex-start'
        spacing={2}
        style={{ padding: 20, marginLeft: 40 }}>
        <Grid item xs={6}>
          <Typography variant='subtitle2' align='left' className={classes.productName}>
            {product.name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs style={{ textAlign: 'left' }}>
            <img
              onClick={() => router.push('/Allergies')}
              src='/assets/images/american/allergies_icon.png'
              width='75'
              style={{ cursor: 'pointer' }}
            />
          </Grid>
          <Grid item xs className={classes.priceDiv}>
            <Typography variant='body2' className={classes.priceTag}>
              ${product.price}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs>
          <Typography variant='body1' align='left' style={{ fontSize: 12 }}>
            {product.description}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const renderBackButton = () => {
    return (
      <Grid item xs style={{ margin: '40px 0px 70px 0px' }}>
        <Button onClick={() => router.back()} variant='contained' className={classes.backButton}>
          Go Back
        </Button>
      </Grid>
    );
  };

  const renderSmartLogo = () => {
    return (
      <Grid item xs className={classes.logoDiv}>
        <div>
          <img src='/assets/images/logo_smart.png' />
        </div>
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
          <Grid container direction='column'>
            {renderImage()}
            {renderDetails()}
            {renderBackButton()}
            {renderSmartLogo()}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default AmericanDetails;
