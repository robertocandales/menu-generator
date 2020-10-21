import React from 'react';
import MdRefresh from 'react-ionicons/lib/MdRefresh';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLORS } from '../../../Utils/Colors/color';
import { Button } from '@material-ui/core';

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
    marginTop: theme.spacing(1),
  },
}));
const ResetButton = ({ resetData }) => {
  const classes = useStyles();

  const BUTTONS = [
    {
      title: 'RESET',
      icon: <MdRefresh className={classes.icon} />,
      onPress: () => {
        resetData();
      },
      style: { backgroundColor: COLORS.WHITE },
    },
  ];
  return (
    <Grid container spacing={4} justify='center' alignItems='center'>
      {BUTTONS.map((item, index) => (
        <Grid key={index.toString()} item xs={12}>
          <Button variant='contained' color='primary' onClick={() => item.onPress()}>
            {item?.title}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default ResetButton;
