import React, { useState } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    color: "white",
  },
  innerRoot: {
    maxWidth: 450,
    width: "100%",
    minWidth: 330,
    textAlign: "center",
    height: "100%",
    backgroundImage: "url('/assets/images/american/americanbg.png')",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundSize: "100%",
    paddingBottom: 40,
  },
  categoryTag: {
    backgroundImage: "url('/assets/images/american/cat_bg.png')",
    width: 270,
    height: 50,
    backgroundRepeat: "no-repeat",
    paddingTop: 8,
  },
  priceDiv: {
    backgroundImage: "url('/assets/images/american/price_bg.png')",
    width: 65,
    height: 25,
    backgroundRepeat: "no-repeat",
    paddingTop: 4,
    paddingLeft: 15,
  },
  priceTag: {
    fontSize: 13,
    color: "orange",
    fontWeight: "bold",
  },
  logoDiv: {
    backgroundColor: "black",
    width: "100%",
    padding: 10,
    marginBottom: 50,
  },
}));

const Categories = [
  { id: 0, name: "Hamburgers", productsID: [0, 2, 3, 4] },
  { id: 1, name: "Drinks", productsID: [0, 1, 2] },
];

const Products = [
  {
    id: 0,
    name: "Chicken Steak Burger",
    description: "Lorem ipsum is the best lorem ipsum is the best",
    price: "10",
  },
  {
    id: 1,
    name: "Beaf Burger",
    description: "Lorem ipsum is the best lorem ipsum is the best",
    price: "20",
  },
  {
    id: 2,
    name: "Chicken Burger",
    description: "Lorem ipsum is the best lorem ipsum is the best",
    price: "30",
  },
  {
    id: 3,
    name: "Steak Cheese Burger",
    description: "Lorem ipsum is the best lorem ipsum is the best",
    price: "40",
  },
  {
    id: 4,
    name: "Daal Bun Kabab",
    description: "Lorem ipsum is the best lorem ipsum is the best",
    price: "50",
  },
];

const AmericanBasic = () => {
  const classes = useStyles();
  const router = useRouter();

  const [categories, setCategories] = useState(Categories);
  const [products, setProducts] = useState(Products);

  const renderSmartLogo = () => {
    return (
      <Grid item xs className={classes.logoDiv}>
        <div>
          <img src="/assets/images/logo_smart.png" />
        </div>
      </Grid>
    );
  };

  const renderMenuLogo = () => {
    return (
      <Grid item xs>
        <img src="/assets/images/american/amr_logo_w.png" />
      </Grid>
    );
  };

  const renderCategories = () => {
    return categories.map((category, index) => (
      <>
        <Grid item xs style={{ margin: "40px 0px" }}>
          <div className={classes.categoryTag}>
            <Typography variant="subtitle2" style={{ fontSize: 21 }}>
              {category.name}
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          xs
          container
          spacing={2}
          style={{ textAlign: "left", padding: 20 }}
        >
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
      <Grid item xs={6} key={index}>
        <div>
          <Typography
            variant="subtitle2"
            gutterBottom
            style={{ fontSize: 13, color: "#FFAE04" }}
          >
            {product.name}
          </Typography>
          <Typography variant="body1" style={{ fontSize: 10 }}>
            {product.description}
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            style={{ marginTop: -10, letterSpacing: "0.1em" }}
          >
            ..............
          </Typography>
          <Grid item container xs justify="space-between">
            <Grid item>
              <img
                onClick={() => router.push("/Allergies")}
                src="/assets/images/american/allergies_icon.png"
                width="65"
                style={{ cursor: "pointer" }}
              />
            </Grid>
            <Grid item>
              <div className={classes.priceDiv}>
                <Typography variant="body2" className={classes.priceTag}>
                  ${product.price}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    ));
  };

  return (
    <div className={classes.root}>
      <div className={classes.innerRoot}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          {renderSmartLogo()}
          {renderMenuLogo()}
          {renderCategories()}
        </Grid>
      </div>
    </div>
  );
};

export default AmericanBasic;
