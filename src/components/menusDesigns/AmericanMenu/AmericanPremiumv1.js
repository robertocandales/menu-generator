import React, { useState } from 'react';
import { useRouter } from 'next/router';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
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
  },
  categoryDiv: {
    backgroundImage: "url('/assets/images/american/cat_bg.png')",
    width: 270,
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

const menuObj = {
  withPicture: true,
  address: 'Jalan Piit No.1 Kelurahan Coblong, Kecamatan Sadang Serang, Bandung - Indonesia 48719.',
  schedule: {
    montofri: { from: '11:00', to: '10:00' },
    sat: { from: '01:30', to: '12:30' },
    sun: { from: '01:30', to: '11:00' },
  },
  wifi: { name: 'Smartavola', password: 'smartavola123' },
  facebook: 'https://www.facebook.com/profile.php?id=100002596582204',
  instagram: 'https://www.facebook.com/profile.php?id=100002596582204',
  twitter: 'https://www.facebook.com/profile.php?id=100002596582204',
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

const Categories = [
  { id: 0, name: 'Hamburgers', productsID: [0, 2, 3] },
  { id: 1, name: 'Drinks', productsID: [0, 1] },
];

const Products = [
  {
    id: 0,
    name: 'Chicken Steak Burger',
    description: 'Lorem ipsum is the best lorem ipsum is the best',
    price: '10',
    image: '/assets/images/american/burger.png',
  },
  {
    id: 1,
    name: 'Beaf Burger',
    description: 'Lorem ipsum is the best lorem ipsum is the best',
    price: '20',
    image: '/assets/images/american/coca.png',
  },
  {
    id: 2,
    name: 'Chicken Burger',
    description: 'Lorem ipsum is the best lorem ipsum is the best',
    price: '30',
    image: '/assets/images/american/burger.png',
  },
  {
    id: 3,
    name: 'Steak Cheese Burger',
    description: 'Lorem ipsum is the best lorem ipsum is the best',
    price: '40',
    image: '/assets/images/american/coca.png',
  },
  {
    id: 4,
    name: 'Daal Bun Kabab',
    description: 'Lorem ipsum is the best lorem ipsum is the best',
    price: '50',
    image: '/assets/images/american/burger.png',
  },
];

const AmericanPremium = () => {
  const classes = useStyles();
  const router = useRouter();
  const { query } = router;
  console.log(query);

  const [categories, setCategories] = useState(Categories);
  const [products, setProducts] = useState(Products);
  const [activeTab, setActiveTab] = useState(0);

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
        <img src='/assets/images/american/amr_logo_w.png' />
      </Grid>
    );
  };

  const renderRestaurantDetails = () => {
    return (
      <>
        <Grid
          item
          xs
          container
          justify='center'
          alignItems='center'
          spacing={4}
          style={{ marginTop: 15 }}>
          {['Direction', 'Schedule', 'Wi-Fi'].map((val, index) => (
            <Grid item key={val}>
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
          spacing={4}
          style={{ marginTop: 10, height: 100 }}>
          {activeTab === 0 && Address()}
          {activeTab === 1 && Schedule()}
          {activeTab === 2 && Wifi()}
        </Grid>
      </>
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
        Mon-Fri {menuObj.schedule.montofri.from}-{menuObj.schedule.montofri.to}
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
      <>
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
      </>
    );
  };

  const renderCategories = () => {
    return categories.map((category, index) => (
      <>
        <Grid item xs style={{ margin: '40px 0px' }}>
          <div className={classes.categoryDiv}>
            <Typography variant='subtitle2' style={{ fontSize: 21 }}>
              {category.name}
            </Typography>
          </div>
        </Grid>
        <Grid item container xs spacing={5} style={{ textAlign: 'left', padding: 5 }}>
          {renderProducts(category)}
        </Grid>
      </>
    ));
  };

  const renderProducts = (category) => {
    const productsArray = [
      ...products.filter((product) => category.productsID.includes(product.id)),
    ];
    return productsArray.map((product, index) => (
      <Grid
        item
        container
        xs={12}
        spacing={1}
        direction='row'
        justify='center'
        alignItems='center'
        key={index}>
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
          <Typography variant='body1' style={{ fontSize: 10 }}>
            {product.description}
          </Typography>
        </Grid>
        <Grid item xs={3}>
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
                    pathname: '/AmericanDetails',
                    query: { ...product },
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
    ));
  };

  return (
    <div className={classes.root}>
      <div className={classes.innerRoot}>
        <Grid container direction='column' justify='flex-start' alignItems='center'>
          {renderSmartLogo()}
          {renderMenuLogo()}
          {renderRestaurantDetails()}
          {renderSocialLinks()}
          {renderCategories()}
        </Grid>
      </div>
    </div>
  );
};

export default AmericanPremium;
