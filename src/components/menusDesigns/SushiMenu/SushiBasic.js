import React, { useState } from "react";
import { useRouter } from "next/router";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  innerRoot: {
    maxWidth: 450,
    width: "100%",
    minWidth: 330,
    textAlign: "center",
    height: "100%",
    paddingBottom: 40,
    backgroundImage: "url('/assets/images/sushi/sushi_bg.png')",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundSize: "100%",
  },
  categoryDiv: {},
  priceTag: {
    marginTop: 5,
  },
  logoDiv: {
    backgroundColor: "black",
    width: "100%",
    padding: 10,
  },
  menuLogo: {
    width: "100%",
    padding: 35,
    backgroundColor: "white",
    borderBottomLeftRadius: "50% 80%",
    borderBottomRightRadius: "50% 80%",
    boxShadow: "0px 1px 12px silver",
  },
}));

const Categories = [
  { id: 0, name: "Main Courses", productsID: [0, 2, 3] },
  { id: 1, name: "Drinks", productsID: [0, 1, 4] },
];

const Products = [
  {
    id: 0,
    name: "Sushi Chicken Pizza",
    description: "Bakar, ensalada, topping",
    price: 10,
    image: "/assets/images/american/burger.png",
  },
  {
    id: 1,
    name: "Creamy Tikka Pizza",
    description: "Lorem ipsum is the best lorem ipsum is the best",
    price: 20,
    image: "/assets/images/american/coca.png",
  },
  {
    id: 2,
    name: "Spicy Italian",
    description: "Lorem ipsum is the best lorem ipsum is the best",
    price: 30,
    image: "/assets/images/american/burger.png",
  },
  {
    id: 3,
    name: "Pepperoni Grill",
    description: "Bakar, ensalada, topping",
    price: 40,
    image: "/assets/images/american/coca.png",
  },
  {
    id: 4,
    name: "Mango Ice Desert",
    description: "Lorem ipsum is the best lorem ipsum is the best",
    price: 50,
    image: "/assets/images/american/burger.png",
  },
];

const SushiBasic = () => {
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
      <Grid item xs className={classes.menuLogo}>
        <img src="/assets/images/sushi/sushi_logo_b.png" width="110" />
      </Grid>
    );
  };

  const renderCategories = () => {
    return (
      <Grid item container xs justify="center">
        {categories.map((category, index) => (
          <>
            <Grid item xs={12} style={{ margin: "15px 25px" }}>
              <div className={classes.categoryDiv}>
                <Typography variant="h6" align="left">
                  {category.name}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} container justify="center">
              {renderProducts(category)}
            </Grid>
          </>
        ))}
      </Grid>
    );
  };

  const renderProducts = (category) => {
    const productsArray = [
      ...products.filter((product) => category.productsID.includes(product.id)),
    ];
    return productsArray.map((product, index) => (
      <Grid
        item
        xs={12}
        container
        justify="center"
        key={index}
        style={{ textAlign: "left", padding: "10px 25px" }}
      >
        <Grid item xs>
          <div style={{ maxWidth: "80%" }}>
            <Typography variant="body1" style={{ color: "#f7772e" }}>
              {product.name}
            </Typography>
            <Typography
              variant="body1"
              style={{ fontSize: 10, color: "black", marginBottom: 10 }}
            >
              {product.description}
            </Typography>
          </div>
          <img
            onClick={() => router.push("/Allergies")}
            src="/assets/images/american/allergies_icon.png"
            width="70"
            style={{ cursor: "pointer" }}
          />
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" className={classes.priceTag}>
            ${product.price.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    ));
  };

  return (
    <div className={classes.root}>
      <div className={classes.innerRoot}>
        <Grid container direction="column" alignItems="center">
          {renderSmartLogo()}
          {renderMenuLogo()}
          {renderCategories()}
        </Grid>
      </div>
    </div>
  );
};

export default SushiBasic;
