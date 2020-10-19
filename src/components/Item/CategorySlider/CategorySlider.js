import React, { useState, useContext, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MuiPaper from '@material-ui/core/Paper';
import Slider from 'react-slick';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import Avatar from '@material-ui/core/Avatar';
import { store } from '../../../context/store';

const Paper = withStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
}))(MuiPaper);
const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  container: {
    padding: theme.spacing(0),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  categoryImage: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  categoryTitle: {
    // marginLeft: theme.spacing(3),
    // position: 'absolute',
    fontWeight: 'bold',
  },
  itemInfoFieldsContainer: {
    padding: `${theme.spacing(6)}px ${theme.spacing(5)}px`,
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  categories: {
    cursor: 'pointer',
  },
  slider: {
    paddingLeft: theme.spacing(6),
  },
}));
const CategorySlider = ({
  categories,
  setCategories,
  setCategoryValue,
  setShowEditDataFromTable,
}) => {
  const classes = useStyles();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setloading(true);

    if (categories.length) {
      setloading(false);
    }
  }, [categories]);

  const editData = (category) => {
    setCategoryValue(category.title);
    setShowEditDataFromTable(false);
  };
  const size = window.screen.availWidth;

  return (
    <div style={{ width: '100%', marginBottom: '15px' }}>
      <Paper
        className={classes.container}
        elevation={3}
        style={{ width: '100%', height: '100%', padding: '10px' }}>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          spacing={1}
          wrap='nowrap'
          style={{
            maxWidth: '90vw',
            overflowX: 'auto',
            width: '100%',
          }}>
          {!loading && categories
            ? categories.map((category, i) => (
                <Grid key={i} onClick={() => editData(category)} item>
                  <IconButton>
                    <Grid container direction='column' alignItems='center' justify='center'>
                      <Grid item>
                        <Avatar src={category.image} className={classes.categoryImage} alt='...' />
                      </Grid>{' '}
                      <Grid item>
                        <Typography
                          variant='subtitle1'
                          align='center'
                          className={classes.categoryTitle}>
                          {category.title}
                        </Typography>
                      </Grid>
                    </Grid>
                  </IconButton>
                </Grid>
              ))
            : 'no hay datos'}
        </Grid>
      </Paper>
    </div>
  );
};

export default CategorySlider;
