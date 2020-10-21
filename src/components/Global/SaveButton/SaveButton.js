import React from 'react';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLORS } from '../../../Utils/Colors/color';
import MdSave from '@material-ui/icons/Save';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));
const SaveButton = ({ handleSubmit }) => {
  const classes = useStyles();

  const BUTTONS = [
    {
      title: 'SAVE',
      icon: <MdSave className={classes.icon} />,
      onPress: () => handleSubmit(),
      style: { backgroundColor: COLORS.PRIMARY },
    },
  ];
  return (
    <Grid container justify='center'>
      {BUTTONS.map((item, index) => (
        <Grid key={index.toString()} item>
          <Button
            type={item.title === 'Save' ? 'submit' : null}
            form={item.title === 'Save' ? 'hook-form' : null}
            variant='contained'
            style={item?.style || {}}
            onClick={() => item.onPress()}>
            {item?.title}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default SaveButton;
