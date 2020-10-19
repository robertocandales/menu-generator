import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLORS } from '../../../Utils/Colors/color';

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
}));

const DeleteButton = ({ deleteData }) => {
  const classes = useStyles();

  const BUTTONS = [
    {
      title: 'DELETE',
      icon: <DeleteIcon className={classes.icon} />,
      onPress: () => {
        //deleteData();
      },
      style: { backgroundColor: 'white' },
    },
  ];
  return (
    <Grid container spacing={4} justify='space-between'>
      <Grid item xs={12} sm={6} lg={4}></Grid>
      <Grid item xs={12} sm={6} lg={8}>
        <Grid container spacing={3} justify='flex-end'>
          {BUTTONS.map((item, index) => (
            <Grid key={index.toString()} item>
              <Fab
                variant='extended'
                style={{ backgroundColor: 'white' } || {}}
                onClick={() => item.onPress()}>
                {item.icon} {item?.title}
              </Fab>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DeleteButton;
