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
  },
  innerRoot: {
    maxWidth: 450,
    width: '100%',
    minWidth: 330,
    textAlign: 'center',
    height: '100vh',
    paddingTop: 40,
  },
  priceTag: {
    color: '#9b8556',
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
    borderRadius: 200,
    padding: 15,
    width: 200,
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1,
  },
  avatar: {
    maxWidth: '100%',
    maxHeight: theme.spacing(20),
    marginTop: -40,
  },
  ribbon: {
    backgroundColor: '#191919',
    width: '100%',
    maxWidth: 450,
    height: 50,
    position: 'absolute',
    top: 95,
  },
  backButton: {
    backgroundColor: '#191919',
    color: 'white',
    width: 280,
    borderRadius: 0,
    boxShadow: 'none',
    padding: 10,
    textTransform: 'capitalize',
  },
}));

const NikuDetails = () => {
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
    //setProduct(router.query);
  }, []);

  const renderImage = () => {
    return (
      <Grid item container xs={12} justify='center'>
        <Grid item className={classes.imageDiv}>
          <Avatar
            src={product?.image || '/assets/images/american/burger.png'}
            style={{ width: 150, height: 150, padding: 10, marginTop: -50 }}
          />
        </Grid>
        <div className={classes.ribbon} />
      </Grid>
    );
  };

  const renderDetails = () => {
    return (
      <Grid xs={12} item container direction='column' spacing={2} style={{ padding: 40 }}>
        {loading ? (
          <SkeletonComponent />
        ) : (
          <Grid item container direction='column' justify='center'>
            <Grid item xs={12} container justify='space-between'>
              <Grid item container xs justify='center'>
                <Grid item xs style={{ textAlign: 'left' }}>
                  <Typography variant='h5' className={classes.priceTag}>
                    {product.name}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <img
                    onClick={() => router.push('/Allergies')}
                    src='/assets/images/american/allergies_icon.png'
                    width='75'
                    style={{ cursor: 'pointer' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <Typography variant='subtitle2' gutterBottom align='left'>
                $ {product.price}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant='body1' align='left' style={{ fontSize: 12, color: 'black' }}>
                {product.description}
              </Typography>
            </Grid>
          </Grid>
        )}
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

export default NikuDetails;
