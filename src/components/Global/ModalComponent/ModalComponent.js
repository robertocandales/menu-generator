import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { deleteCategory } from '../../../firebase/db/category';
import { store } from '../../../context/store';
import Notification from '../Notification/Notification';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function ModalComponent({
  open1,
  setOpen1,
  message = '',
  seteditCategory,
  setAddCategoryData,
  addCategoryData,
  resetData,
}) {
  const globalState = useContext(store);
  const { editCategoryState, state } = globalState;
  const [open, setOpen] = useState(false);
  const [errorEndpoint, setErrorEndpoint] = useState({
    message: '',
    isError: false,
    success: false,
  });

  const handleClose = async () => {
    setOpen1(false);
  };
  const deleteCat = async () => {
    const res = await deleteCategory(editCategoryState.edit.list.id);

    if (res) {
      setAddCategoryData(addCategoryData.filter((prev) => prev.id !== res));
      seteditCategory(false);
      setOpen(true);
      setErrorEndpoint({ message: `  Delete category!`, success: true });
      seteditCategory(false);
      resetData();
      setOpen1(false);
    } else {
      setOpen1(true);
      setErrorEndpoint({ message: 'Category update error ', isError: true });
    }
  };
  return (
    <div>
      <Dialog
        open={open1}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle id='alert-dialog-slide-title'>{'Warning!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Disagree
          </Button>
          <Button onClick={deleteCat} color='primary'>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Notification
        success={errorEndpoint.success}
        error={errorEndpoint.isError}
        message={errorEndpoint.message}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
