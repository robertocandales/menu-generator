import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLORS } from '../../../Utils/Colors/color';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';

import { store } from '../../../context/store';

const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  bigIcon: {
    width: 40,
    height: 'auto',
  },
  mainContainer: {
    marginTop: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(5),
    paddingTop: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  optionSelector: {
    marginTop: theme.spacing(3),
  },
  subCategory: {
    padding: theme.spacing(0.8),
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    minWidth: theme.spacing(8),
    textAlign: 'center',
    display: 'inline-flex',
    backgroundColor: COLORS.PRIMARY,
    fontSize: theme.spacing(1.6),
    borderRadius: theme.spacing(0.5),
    boxShadow: '1px 1px 3px grey',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryListItem: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    '&:hover': {
      background: '#f5f5f5',
    },
  },
}));

const CategoriesList = ({
  category,
  picture,
  salesTax,
  resetData,
  seteditCategory,
  //  editCategoryFromList,
  id,
  list,
}) => {
  const classes = useStyles();
  const globalState = useContext(store);
  const { editCategorydispatch } = globalState;

  const editCategoryData = (list) => {
    resetData();
    seteditCategory(true);
    editCategorydispatch({
      type: 'EDIT_CATEGORY',
      data: { list },
    });
  };
  return (
    <div style={{ width: '100%' }}>
      <Card className={classes.categoryListItem}>
        <Grid container direction='row' justify='center' alignItems='center'>
          <Grid item xs={1} md={1}>
            <Avatar src={picture} className={classes.icon} style={{ width: 60, height: 60 }} />
          </Grid>
          <Grid item xs={4}>
            <Typography variant='h5' align='center'>
              {category}
            </Typography>
          </Grid>
          <Grid item xs={6} md={5}>
            {salesTax ? salesTax.map((sales, i) => <div key={i}>{sales.taxPercent}%</div>) : null}
          </Grid>
          <Grid item xs={1} md={1}>
            <Button
              style={{
                padding: 10,
                paddingRight: 0,
                boxShadow: '0px 1px 3px grey',
              }}
              //  onClick={
              //    editCategoryFromList
              //      ? () => editCategoryFromList(category, picture, salesTax, subcategory, index)
              //      : null
              //  }
              onClick={() => editCategoryData(list)}>
              <img
                alt='edit icon'
                src={'/assets/images/editIcon.png'}
                className={classes.icon}
                style={{ width: 20 }}
              />
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default CategoriesList;
