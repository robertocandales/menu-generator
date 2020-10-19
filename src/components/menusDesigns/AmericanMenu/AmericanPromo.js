import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
    height: "100vh",
    paddingTop: 40,
  },
  imageDiv: {
    backgroundColor: "white",
    borderRadius: 200,
    padding: 15,
    width: 200,
    height: 200,
    border: "1px solid #2b2b2c",
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  curvedDiv: {
    backgroundColor: "#2b2b2c",
    marginTop: 170,
    borderTopLeftRadius: "50% 30%",
    borderTopRightRadius: "50% 30%",
  },
  seeMenuButton: {
    backgroundColor: "#ffae04",
    color: "white",
    borderRadius: 100,
    width: 280,
    textTransform: "capitalize",
    padding: 14,
  },
}));

const AmericanPromo = () => {
  const classes = useStyles();
  const router = useRouter();

  const renderMenuLogo = () => {
    return (
      <Grid item xs>
        <img src="/assets/images/american/amr_logo_b.png" />
      </Grid>
    );
  };

  const renderImage = () => {
    return (
      <Grid item container xs justify="center" style={{ marginTop: -100 }}>
        <div className={classes.imageDiv}>
          <img
            alt="product"
            src="/assets/images/american/burger.png"
            className={classes.avatar}
          />
        </div>
      </Grid>
    );
  };

  const renderDetails = () => {
    return (
      <Grid item container xs direction="column" style={{ padding: 30 }}>
        <Grid item xs>
          <Typography variant="h2">50%</Typography>
        </Grid>
        <Grid item xs>
          <Typography
            variant="body1"
            gutterBottom
            style={{ fontSize: 35, fontWeight: "lighter" }}
          >
            DISCOUNT
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="body1">
            FOR CONSUMPTIONS GREATER THAN $100
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const renderBackButton = () => {
    return (
      <Grid item xs style={{ margin: "20px 0px 60px 0px" }}>
        <Button
          onClick={() => router.push("/AmericanPremium")}
          variant="contained"
          className={classes.seeMenuButton}
        >
          See Menu
        </Button>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.innerRoot}>
        <Grid container direction="column">
          {renderMenuLogo()}
          <div className={classes.curvedDiv}>
            {renderImage()}
            {renderDetails()}
            {renderBackButton()}
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default AmericanPromo;
