import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Notification = ({
  error = false,
  warning = false,
  success = false,
  info = false,
  message,
  open = false,
  setOpen,
}) => {
  const classes = useStyles();
  const [state] = React.useState({
    vertical: 'top',
    horizontal: 'right',
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const { vertical, horizontal } = state;

  return (
    <div className={classes.root}>
      {success ? (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}>
          <Alert onClose={handleClose} severity='success'>
            {message ? message : 'success'}{' '}
          </Alert>
        </Snackbar>
      ) : null}
      {error ? (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}>
          <Alert onClose={handleClose} severity='error'>
            {message ? message : 'error'}
          </Alert>
        </Snackbar>
      ) : null}
      {warning ? (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}>
          <Alert onClose={handleClose} severity='warning'>
            {message ? message : 'warning'}
          </Alert>
        </Snackbar>
      ) : null}
      {info ? (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}>
          <Alert onClose={handleClose} severity='info'>
            {message ? message : 'info'}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
};

export default Notification;
