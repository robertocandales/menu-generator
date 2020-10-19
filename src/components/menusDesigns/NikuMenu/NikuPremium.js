import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchProducts } from '../../../firebase/db/product';
import { getMenuConfig } from '../../../firebase/db/digital-menu';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Avatar, Paper } from '@material-ui/core';
import SkeletonComponent from '../../Global/SkeletonComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: -30,
  },
  innerRoot: {
    maxWidth: 450,
    width: '100%',
    minWidth: 330,
    textAlign: 'center',
    height: '100%',
    paddingBottom: 40,
  },
  categoryDiv: {
    color: '#9b8556',
  },
  priceTag: {
    color: '#9b8556',
    fontSize: 13,
  },
  logoDiv: {
    backgroundColor: 'black',
    width: '100%',
    padding: 10,
  },
  imageDiv: {
    borderRadius: 200,
    width: '100%',
    maxWidth: 80,
    maxHeight: 80,
  },
  avatar: {
    maxWidth: '100%',
    maxHeight: theme.spacing(10),
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
  },
  menuLogo: {
    backgroundColor: '#191919',
    width: '100%',
    padding: 30,
    marginTop: -3,
  },
  detailsDiv: {
    backgroundColor: '#191919',
    color: 'white',
    width: '100%',
  },
  detailsButton: {
    backgroundColor: '#fff',
    color: 'black',
    borderRadius: 0,
    width: 70,
    fontSize: 9,
    textTransform: 'capitalize',
    boxShadow: 'none',
    border: '1px solid black',
    padding: 3,
  },
}));

const NikuPremium = ({ Menus }) => {
  const classes = useStyles();
  const router = useRouter();
  const getUrl = window.location;

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  const { query } = router;
  const [data, setData] = useState({});

  localStorage.setItem('user', JSON.stringify(query));

  const user = JSON.parse(localStorage.getItem('user'));

  React.useEffect(() => {
    const getUrl = window.location;

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
      <Grid item xs className={classes.menuLogo}>
        <img
          src={
            data.isProductsWithPicture && data.picture !== ''
              ? data.picture
              : '/assets/images/niku/niku_logo_w.png'
          }
          width='90'
        />
      </Grid>
    );
  };

  const renderRestaurantDetails = () => {
    return (
      <Grid item xs className={classes.detailsDiv}>
        <Grid item xs container justify='center' alignItems='center'>
          {['Direction', 'Schedule', 'Wi-Fi'].map((val, index) => (
            <Grid item key={index} style={{ width: 85 }}>
              <Typography
                onClick={() => setActiveTab(index)}
                variant='subtitle2'
                style={{
                  fontSize: 14,
                  cursor: 'pointer',
                  color: activeTab === index ? '#9b8556' : 'white',
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
      <Grid
        item
        xs
        container
        justify='center'
        alignItems='center'
        spacing={3}
        style={{ backgroundColor: '#191919' }}>
        {SocialIcons.map((obj, index) => (
          <Grid item key={index}>
            <IconButton size='small' href={obj.link} target='blank' style={{ color: 'white' }}>
              {obj.icon}
            </IconButton>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderCategories = () => {
    return (
      <Grid item container xs justify='center' style={{ padding: '10px' }}>
        <Grid item xs style={{ marginTop: 40 }}>
          <Typography variant='subtitle2' style={{ fontSize: 18 }}>
            OUR MENU
          </Typography>
        </Grid>
        {categories.map((category, index) => (
          <Grid key={index} item container>
            <Grid item xs={12} style={{ margin: '15px 25px' }} key={index}>
              <div className={classes.categoryDiv}>
                <Typography variant='subtitle2' align='center' style={{ fontSize: 14 }}>
                  {category.title.toUpperCase()}
                </Typography>
              </div>
            </Grid>
            <Grid item container xs={12} justify='center'>
              {renderProducts(category)}
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderProducts = (category) => {
    const productsArray = [...products.filter((product) => product.categoryId === category.id)];
    //const productsArray = [
    //  ...products.filter((product) => category.productsID.includes(product.id)),
    //];
    return productsArray.map((product, index) => (
      <Paper
        key={index}
        elevation={5}
        style={{
          width: 450,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: 'rgba(0,0,0,0.02)',
          borderRadius: '20px',
        }}>
        <Grid
          item
          container
          xs={12}
          spacing={1}
          direction='row'
          justify='center'
          alignItems='center'
          style={{ textAlign: 'left', padding: '15px 25px' }}>
          {menuObj.withPicture && (
            <Grid item xs={3}>
              <div className={classes.imageDiv}>
                <Avatar
                  src={product.image}
                  className={classes.avatar}
                  style={{ width: 100, height: 100 }}
                />
                {/*<img alt='product' src={product.image} className={classes.avatar} />*/}
              </div>
            </Grid>
          )}
          <Grid item xs>
            <div style={{ width: '90%' }}>
              <Typography variant='subtitle2' gutterBottom className={classes.priceTag}>
                ${product.price}
              </Typography>
              <Typography variant='body1' gutterBottom style={{ fontSize: 11 }}>
                {product.name}
              </Typography>
              <Typography variant='body1' style={{ fontSize: 9, color: '#9b8556' }}>
                {product.description}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={3}>
            <Grid item container xs direction='column' spacing={1} alignItems='center'>
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
                      pathname: `${getUrl.pathname}/NikuDetails`,
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
    <div className={classes.root} style={{ marginLeft: -40, marginRight: -40 }}>
      {loading ? (
        <div style={{ height: '100%', width: '100%', maxWidth: 450 }}>
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

export default NikuPremium;
