import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Fab, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { COLORS } from '../../../../Utils/Colors/color';
import { store } from '../../../../context/store';
import { fetchCategories } from '../../../../firebase/db/category';
import { fetchProducts } from '../../../../firebase/db/product';
import ListProductsModal from './ListProductsModal';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const DialogListProducts = ({ label = 'add label', setproductSelectedInDialog }) => {
  const classes = useStyles();
  const globalState = useContext(store);

  const { productDispatch } = globalState;
  const [open, setOpen] = React.useState(false);
  const [allItemsData, setAllItemsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage?.getItem('user'));

    const fetchProductsFromDB = () => {
      fetchProducts()
        .then((snapshot) => {
          let items = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          const pr = items.filter((x) => x.user === user.email);

          productDispatch({ type: 'GET_PRODUCTS', data: pr });
          setAllItemsData(pr);
          setLoading(false);
        })
        .catch((er) => {
          console.log('error');
          console.log(er);
          setLoading(false);
        });
    };
    fetchProductsFromDB();
  }, []);

  return (
    <div>
      <Fab variant='extended' style={{ backgroundColor: COLORS.PRIMARY }} onClick={handleClickOpen}>
        <AddIcon className={classes.extendedIcon} />
        {label}
      </Fab>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle id='alert-dialog-slide-title'>{'Add products'}</DialogTitle>
        <DialogContent>
          <Grid container>
            {label === 'Add products' && allItemsData.length && !loading ? (
              <ListProductsModal
                allItemsData={allItemsData}
                setproductSelectedInDialog={setproductSelectedInDialog}
              />
            ) : null}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Disagree
          </Button>
          <Button onClick={handleClose} color='primary'>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogListProducts;
