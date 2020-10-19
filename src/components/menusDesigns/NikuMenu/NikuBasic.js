import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getMenuConfig } from '../../../firebase/db/digital-menu';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { fetchProducts } from '../../../firebase/db/product';
import _ from 'lodash';
import { CategoryOutlined } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import ReceiptIcon from '@material-ui/icons/Receipt';

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
    height: '100%',
    paddingBottom: 40,
  },
  categoryDiv: {
    color: '#9b8556',
  },
  priceTag: {
    color: '#9b8556',
  },
  logoDiv: {
    backgroundColor: 'black',
    width: '100%',
    padding: 10,
  },
  menuLogo: {
    backgroundColor: '#191919',
    width: '100%',
    padding: 35,
    marginTop: -1,
  },
  avatar: {
    width: '100%',
    maxWidth: theme.spacing(10),
    height: theme.spacing(10),
    padding: 3,
    backgroundColor: 'white',
    borderRadius: 200,
  },
}));

const Categories = [
  { id: 0, title: 'Main Courses', productsID: [0, 2, 3] },
  { id: 1, title: 'Drinks', productsID: [0, 1] },
];

const Products = [
  {
    id: 0,
    name: 'Rollos de Zuni con salsa de frambuesa y chipotle',
    description: 'Bakar, ensalada, topping',
    price: 10,
    image: '/assets/images/american/burger.png',
  },
  {
    id: 1,
    name: 'Ensalada cremosa de pescado',
    description: 'Lorem ipsum is the best lorem ipsum is the best',
    price: 20,
    image: '/assets/images/american/coca.png',
  },
  {
    id: 2,
    name: 'Fettuccine de pollo cajún',
    description: 'Lorem ipsum is the best lorem ipsum is the best',
    price: 30,
    image: '/assets/images/american/burger.png',
  },
  {
    id: 3,
    name: 'Vino Penfols',
    description: 'Bakar, ensalada, topping',
    price: 40,
    image: '/assets/images/american/coca.png',
  },
  {
    id: 4,
    name: 'Vino Penfols',
    description: 'Lorem ipsum is the best lorem ipsum is the best',
    price: 50,
    image: '/assets/images/american/burger.png',
  },
];

const NikuBasic = () => {
  const classes = useStyles();
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [interceptionArraysCatAndProduct, setInterceptionArraysCatAndProduct] = useState([]);
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    const menuConfigData = async () => {
      const res = await getMenuConfig();
      setData(res);
      setCategories(res.storeCategories);
    };
    const fetchProductsFromDB = () => {
      fetchProducts()
        .then((snapshot) => {
          let items = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          setProducts(items);
        })
        .catch((er) => {
          console.log('error');
          console.log(er);
        });
    };

    fetchProductsFromDB();

    menuConfigData();
  }, []);

  useEffect(() => {
    const interceptionArrays = (categories, products) => {
      const result = _.intersectionWith(products, categories, (o, num) => o.category == num.title);
      setInterceptionArraysCatAndProduct(result);

      //return result;
    };
    if (categories.length && products.length) {
      interceptionArrays(categories, products);
    }
  }, [products, categories]);

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
        <img src='/assets/images/niku/niku_logo_w.png' width='70' />
      </Grid>
    );
  };

  const renderCategories = (category, products) => {
    return (
      <Grid item container xs justify='center'>
        <Grid item xs={12} style={{ marginTop: 20 }}>
          <Typography variant='subtitle2' style={{ fontSize: 18 }}>
            OUR MENU
          </Typography>
        </Grid>
        {/*<Grid item xs={12} container direction='row' justify='space-around' alignItems='center'>
          {data.isCallWaiterButton ? (
            <Grid>
              <Fab size='small' color='secondary' aria-label='add' className={classes.margin}>
                <RoomServiceIcon />
              </Fab>
            </Grid>
          ) : null}
          {data.isAskForBillButton ? (
            <Grid>
              {' '}
              <Fab size='small' color='secondary' aria-label='add' className={classes.margin}>
                <ReceiptIcon />
              </Fab>
            </Grid>
          ) : null}
        </Grid>*/}
        {/*<Grid
          item
          xs={12}
          container
          direction='row'
          justify='space-around'
          alignItems='center'
          style={{ marginTop: 15 }}
          className={classes.categoryDiv}>
          {data.facebookId ? <Grid>{data.facebookId}</Grid> : null}
          {data.instagramId ? <Grid>{data.instagramId}</Grid> : null}
          {data.whatsappNumber ? <Grid>{data.whatsappNumber}</Grid> : null}
          {data.twitterId ? <Grid>{data.twitterId}</Grid> : null}
        </Grid>*/}
        {/*<Grid
          item
          xs={12}
          container
          direction='row'
          justify='space-around'
          alignItems='center'
          style={{ marginTop: 5, marginBottom: 15 }}
          className={classes.categoryDiv}>
          {data.wifiName ? <Grid>{data.wifiName}</Grid> : null}
          {data.wifiPass ? <Grid>{data.wifiPass}</Grid> : null}
          {data.storeName ? <Grid>{data.storeName}</Grid> : null}
          {data.storeAddress ? <Grid>{data.storeAddress}</Grid> : null}
        </Grid>*/}
        {categories.map((category, index) => (
          <div key={index} style={{ width: '100%' }}>
            <Grid item xs={12} style={{ margin: '15px 25px' }}>
              <div className={classes.categoryDiv}>
                <Typography variant='subtitle2' align='left' style={{ fontSize: 14 }}>
                  {category.title.toUpperCase()}
                </Typography>
              </div>
            </Grid>
            <Grid item container xs={12}>
              {renderProducts(category)}
            </Grid>
          </div>
        ))}
      </Grid>
    );
  };

  const renderProducts = (category) => {
    const productsArray1 = [
      ...products.filter((product) => category.id.includes(product.categoryId)),
    ];
    //const productsArray = interceptionArraysCatAndProduct;
    return productsArray1.map((product, index) => (
      <Grid
        item
        container
        xs={12}
        spacing={1}
        direction='row'
        justify='center'
        alignItems='center'
        key={index}
        style={{ textAlign: 'left', padding: '10px 25px' }}>
        <Grid item xs>
          <div style={{ maxWidth: '70%' }}>
            <Typography variant='body1' gutterBottom style={{ fontSize: 12 }}>
              {product.name}
            </Typography>
            <Typography variant='body1' style={{ fontSize: 10, color: '#9b8556' }}>
              {product.description}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={3}>
          <Grid item container xs direction='column' spacing={2} alignItems='center'>
            <Grid item xs>
              <Typography variant='subtitle2' className={classes.priceTag}>
                ${product.price}
              </Typography>
            </Grid>
            <Grid item xs>
              <img
                onClick={() => router.push('/Allergies')}
                src='/assets/images/american/allergies_icon.png'
                width='70'
                style={{ cursor: 'pointer' }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    ));
  };

  return (
    <div className={classes.root}>
      <div className={classes.innerRoot}>
        <Grid container direction='column' alignItems='center'>
          {renderSmartLogo()}
          {renderMenuLogo()}
          {renderCategories()}
        </Grid>
      </div>
    </div>
  );
};

export default NikuBasic;
