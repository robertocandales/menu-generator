import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import { fetchProducts } from '../../../firebase/db/product';
import { getMenuConfig } from '../../../firebase/db/digital-menu';
import { Paper } from '@material-ui/core';
import SkeletonComponent from '../../Global/SkeletonComponent';
import { store } from '../../../context/store';

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
    height: '100%',
    backgroundImage: "url('/assets/images/american/americanbg.png')",
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    paddingBottom: 40,
    maxHeight: '100vh',
    overflowY: 'auto;',
  },
  categoryDiv: {
    backgroundImage: "url('/assets/images/american/cat_bg.png')",
    backgroundPosition: 'center',
    width: '100%',
    padding: '15px 25px',
    margin: '10px 10px 10px 0',
    height: 50,
    backgroundRepeat: 'no-repeat',
    paddingTop: 8,
  },
  priceTag: {
    color: 'orange',
    fontWeight: 'bold',
  },
  logoDiv: {
    backgroundColor: 'black',
    width: '100%',
    padding: 10,
    marginBottom: 50,
  },
  avatar: {
    width: '100%',
    maxWidth: theme.spacing(10),
    height: theme.spacing(10),
    padding: 3,
    backgroundColor: 'white',
    borderRadius: 200,
  },
  detailsButton: {
    backgroundColor: '#ffae04',
    color: 'white',
    borderRadius: 100,
    width: 70,
    fontSize: 9,
    textTransform: 'capitalize',
    padding: 5,
  },
}));

const AmericanPremium = () => {
  const globalState = useContext(store);

  const { QRcodeURLDispatch, QRcodeURLState } = globalState;
  console.log(QRcodeURLState);
  const classes = useStyles();
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const getUrl = window.location;
  const { query } = router;

  localStorage.setItem('user', JSON.stringify(query));

  const user = JSON.parse(localStorage.getItem('user'));

  React.useEffect(() => {
    const getUrl = window.location;
    QRcodeURLDispatch({
      type: 'URL',
      url: getUrl,
    });
    localStorage.setItem('url', getUrl);
  }, []);

  React.useEffect(() => {
    const user = JSON.parse(localStorage?.getItem('user'));

    const menuConfigData = async () => {
      const res = await getMenuConfig();
      setData(res);
      setCategories(res.storeCategories);
      setLoading(false);
    };
    const fetchProductsFromDB = () => {
      fetchProducts()
        .then((snapshot) => {
          let items = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          const pr = items.filter((x) => x.user === user.email);
          console.log(pr);
          setProducts(pr);
        })
        .catch((er) => {
          console.log('error');
          console.log(er);
          setLoading(false);
        });
    };
    if (user) {
      fetchProductsFromDB();
      menuConfigData();
    }
  }, []);

  const convertData = (seconds, nanoseconds) => {
    return new Date(seconds * 1000 + nanoseconds / 1000000).toString().substr(16, 16).split(' ')[0];
  };

  const menuObj = {
    withPicture: data.isProductsWithPicture,
    address: data.storeAddress,
    schedule: {
      montofri: {
        from: convertData(data?.timings?.monfri[0].seconds, data?.timings?.monfri[0].nanoseconds),
        to: convertData(data?.timings?.monfri[1].seconds, data?.timings?.monfri[1].nanoseconds),
      },
      sat: {
        from: convertData(data?.timings?.sat[0].seconds, data?.timings?.sat[0].nanoseconds),
        to: convertData(data?.timings?.sat[1].seconds, data?.timings?.sat[1].nanoseconds),
      },
      sun: {
        from: convertData(data?.timings?.sun[0].seconds, data?.timings?.sun[0].nanoseconds),
        to: convertData(data?.timings?.sun[1].seconds, data?.timings?.sun[1].nanoseconds),
      },
    },
    wifi: { name: data.wifiName, password: data.wifiPass },
    facebook: data.facebookId,
    instagram: data.instagramId,
    twitter: data.twitterId,
  };

  const SocialIcons = [
    {
      title: 'Facebook',
      icon: <FacebookIcon />,
      link: `${menuObj?.facebook}`,
    },
    {
      title: 'Instagram',
      icon: <InstagramIcon />,
      link: `${menuObj?.instagram}`,
    },
    {
      title: 'Twitter',
      icon: <TwitterIcon />,
      link: `${menuObj?.twitter}`,
    },
  ];

  const renderSmartLogo = () => {
    return (
      <Grid item xs className={classes.logoDiv}>
        <div>
          <img src='/assets/images/logo_smart.png' />
        </div>
      </Grid>
    );
  };

  const renderMenuLogo = () => {
    return (
      <Grid item xs>
        <img
          src={
            data.isProductsWithPicture && data.picture !== ''
              ? data.picture
              : '/assets/images/american/amr_logo_w.png'
          }
          width='90'
        />
      </Grid>
    );
  };

  const renderRestaurantDetails = () => {
    return (
      <Grid item xs>
        <Grid item xs container justify='center' alignItems='center'>
          {['Direction', 'Schedule', 'Wi-Fi'].map((val, index) => (
            <Grid item key={val} style={{ width: 85 }}>
              <Typography
                onClick={() => setActiveTab(index)}
                variant='subtitle2'
                style={{
                  fontSize: 14,
                  cursor: 'pointer',
                  color: activeTab === index ? 'orange' : 'white',
                }}>
                {val}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          xs
          container
          justify='center'
          alignItems='center'
          style={{ marginTop: 5, height: 100 }}>
          {activeTab === 0 && Address()}
          {activeTab === 1 && Schedule()}
          {activeTab === 2 && Wifi()}
        </Grid>
      </Grid>
    );
  };

  const Address = () => (
    <Grid item xs={6}>
      <Typography variant='subtitle1' style={{ fontSize: 11 }}>
        {menuObj.address}
      </Typography>
    </Grid>
  );
  const Schedule = () => (
    <Grid item xs>
      <Typography variant='subtitle1' style={{ fontSize: 10 }}>
        Opening Hours
      </Typography>
      <Typography variant='subtitle1' style={{ fontSize: 11 }}>
        {data.weekdaysFromTo?.from?.title && data.weekdaysFromTo?.to?.title
          ? `${data.weekdaysFromTo?.from?.title} - ${data.weekdaysFromTo?.to?.title}`
          : 'weekdays'}{' '}
        {menuObj.schedule.montofri.from}-{menuObj.schedule.montofri.to}
        <br />
        Sat {menuObj.schedule.sat.from}-{menuObj.schedule.sat.to}
        <br />
        Sun {menuObj.schedule.sun.from}-{menuObj.schedule.sun.to}
      </Typography>
    </Grid>
  );
  const Wifi = () => (
    <Grid item xs>
      <Typography variant='subtitle1' style={{ fontSize: 11 }}>
        {menuObj.wifi.name}
        <br />
        {menuObj.wifi.password}
      </Typography>
    </Grid>
  );

  const renderSocialLinks = () => {
    return (
      <Grid item xs>
        <Grid
          item
          xs
          container
          justify='center'
          alignItems='center'
          spacing={3}
          style={{ marginTop: 20 }}>
          {SocialIcons.map((obj, index) => (
            <Grid item key={obj.title}>
              <IconButton color='inherit' size='small' href={obj.link} target='blank'>
                {obj.icon}
              </IconButton>
            </Grid>
          ))}
        </Grid>
        <Typography variant='h5' style={{ color: 'orange', letterSpacing: '0.1em' }}>
          ..............................
        </Typography>
      </Grid>
    );
  };

  const renderCategories = () => {
    return (
      <Grid item xs={12} container justify='center' direction='row' alignItems='center'>
        {categories.map((category, index) => (
          <Grid key={index} item container justify='center'>
            <Grid item xs={12} className={classes.categoryDiv}>
              <Typography variant='subtitle2' style={{ fontSize: 21 }}>
                {category.title}
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs
              spacing={5}
              style={{ textAlign: 'left', padding: 5, height: '100%' }}
              justify='center'>
              {renderProducts(category)}
            </Grid>
          </Grid>
        ))}{' '}
      </Grid>
    );
  };

  const renderProducts = (category) => {
    const productsArray = [...products.filter((product) => product.categoryId === category.id)];

    return productsArray.map((product, index) => (
      <Paper
        key={index}
        variant='outlined'
        elevation={3}
        style={{
          width: 400,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          marginBottom: 10,
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderRadius: '20px',
          height: '100%',
        }}>
        <Grid
          item
          container
          xs={12}
          spacing={1}
          direction='row'
          justify='center'
          alignItems='center'
          style={{ padding: '10px', height: '100%' }}>
          {menuObj.withPicture && (
            <Grid item xs={3}>
              <div>
                <img alt='product' src={product.image} className={classes.avatar} />
              </div>
            </Grid>
          )}
          <Grid item xs>
            <Typography variant='subtitle2' className={classes.priceTag}>
              ${product.price}
            </Typography>
            <Typography variant='subtitle2' gutterBottom style={{ fontSize: 12, color: 'orange' }}>
              {product.name}
            </Typography>
            <Typography variant='body1' style={{ fontSize: 10, color: 'orange' }}>
              {product.description}
            </Typography>
          </Grid>
          <Grid item xs={3} container>
            <Grid item container xs spacing={2}>
              <Grid item xs>
                <img
                  onClick={() => router.push('/Allergies')}
                  src='/assets/images/american/allergies_icon.png'
                  width='70'
                  style={{ cursor: 'pointer' }}
                />
              </Grid>
              <Grid item xs>
                <Button
                  onClick={() =>
                    router.push({
                      pathname: `${getUrl.pathname}/AmericanDetails`,
                      query: { id: product.id },
                    })
                  }
                  variant='contained'
                  className={classes.detailsButton}>
                  See Details
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    ));
  };

  return (
    <div className={classes.root} style={{ marginLeft: -40, marginRight: -40, height: '100%' }}>
      {loading ? (
        <div style={{ height: '100%', width: '450px' }}>
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent /> <SkeletonComponent />
          <SkeletonComponent />
        </div>
      ) : (
        <div className={classes.innerRoot}>
          <Grid container direction='column' justify='center' alignItems='center'>
            {renderSmartLogo()}
            {renderMenuLogo()}
            {renderRestaurantDetails()}
            {renderSocialLinks()}
            {renderCategories()}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default AmericanPremium;
