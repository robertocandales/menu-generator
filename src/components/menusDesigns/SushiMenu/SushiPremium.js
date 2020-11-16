import React, { useState } from 'react';
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
import { Avatar } from '@material-ui/core';
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
    backgroundImage: "url('/assets/images/sushi/sushi_bg.png')",
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundSize: '100%',
  },
  categoryDiv: {
    backgroundColor: 'black',
    color: 'white',
    padding: '15px 25px',
    margin: '20px 0 10px 0',
    opacity: 0.3,
  },
  priceTag: {
    fontSize: 13,
    color: 'black',
  },
  logoDiv: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    padding: 10,
  },
  avatar: {
    maxWidth: '100%',
    maxHeight: theme.spacing(12),
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
  },
  menuLogo: {
    width: '100%',
    height: '100%',
    padding: 25,
    backgroundColor: 'white',
    zIndex: 1,
    borderBottom: '2px solid white',
  },
  description: {
    fontSize: 9,
    color: 'black',
    margin: '5px 0px 15px 0px',
  },
  detailsButton: {
    backgroundColor: '#fff',
    color: '#f7772e',
    borderRadius: 100,
    width: 140,
    fontSize: 9,
    textTransform: 'capitalize',
    boxShadow: 'none',
    border: '1px solid #f7772e',
    padding: 5,
  },
  curvedDiv: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomLeftRadius: '50% 90%',
    borderBottomRightRadius: '50% 90%',
    boxShadow: '0px 1px 12px silver',
    paddingBottom: 20,
  },
}));

const SushiPremium = () => {
  const classes = useStyles();
  const router = useRouter();
  const getUrl = window.location;

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const { query } = router;

  localStorage.setItem('user', JSON.stringify(query));

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
              : '/assets/images/sushi/sushi_logo_b.png'
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
                  color: activeTab === index ? '#f7772e' : 'black',
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
        {SocialIcons.map((obj, index) => (
          <IconButton
            key={obj.title}
            size='small'
            href={obj.link}
            target='blank'
            style={{ color: '#f7772e', margin: 10 }}>
            {obj.icon}
          </IconButton>
        ))}
      </Grid>
    );
  };

  const renderCategories = () => {
    return (
      <Grid item xs container justify='center'>
        {categories.map((category, index) => (
          <Grid key={index} item container>
            <Grid item xs={12}>
              <div className={classes.categoryDiv}>
                <Typography variant='h6' align='right'>
                  {category.title}
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

    return productsArray.map((product, index) => (
      <Grid
        item
        xs={12}
        container
        direction={index % 2 === 0 ? 'row' : 'row-reverse'}
        justify='center'
        alignItems='center'
        key={index}
        style={{
          textAlign: 'left',
          padding: '15px 0px',
        }}>
        {menuObj.withPicture && (
          <Grid item xs={6} style={{ height: '100%' }}>
            <div
              style={{
                //backgroundColor: '#f7772e',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              }}>
              {/*<Avatar
                src={product.image}
                className={classes.avatar}
                style={{ width: 100, height: 100 }}
              />*/}
              <img alt='product' src={product.image} className={classes.avatar} />
            </div>
            {/*<Typography
              variant='subtitle2'
              align='center'
              style={{ backgroundColor: '#feede3', padding: 3 }}>
              ${product.price}
            </Typography>*/}
          </Grid>
        )}
        <Grid item xs style={{ padding: '0px 5%' }}>
          <Grid item xs container spacing={1} justify='center'>
            <Grid item xs>
              <Typography variant='subtitle2' style={{ color: '#f7772e' }}>
                {product.name}
              </Typography>
            </Grid>
            <Grid item xs>
              <img
                onClick={() => router.push('/Allergies')}
                src='/assets/images/american/allergies_icon.png'
                width='65'
                style={{ cursor: 'pointer' }}
              />
            </Grid>
            {!menuObj.withPicture && (
              <Grid item>
                <Typography variant='subtitle2' className={classes.priceTag}>
                  ${product.price}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid item xs>
            <Typography variant='body1' className={classes.description}>
              {product.description}
            </Typography>
          </Grid>
          {menuObj.withPicture && (
            <Grid item xs>
              <Typography variant='body1' className={classes.description}>
                {product.price}
              </Typography>
            </Grid>
          )}
          <Grid item xs style={{ textAlign: 'center' }}>
            <Button
              onClick={() =>
                router.push({
                  pathname: `${getUrl.pathname}/SushiDetails`,
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
    ));
  };

  return (
    <div className={classes.root} style={{ marginLeft: -40, marginRight: -40 }}>
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
          <Grid container direction='column' justify='flex-start' alignItems='center'>
            {/*{renderSmartLogo()}*/}
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

export default SushiPremium;
