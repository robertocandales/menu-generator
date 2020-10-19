import React from 'react';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLORS } from '../../../Utils/Colors/color';
import MdSave from '@material-ui/icons/Save';

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
    <Grid container spacing={4} justify='space-between'>
      <Grid item xs={12} sm={6} lg={4}></Grid>
      <Grid item xs={12} sm={6} lg={8}>
        <Grid container spacing={3} justify='flex-end'>
          {BUTTONS.map((item, index) => (
            <Grid key={index.toString()} item>
              <Fab
                type={item.title === 'Save' ? 'submit' : null}
                form={item.title === 'Save' ? 'hook-form' : null}
                variant='extended'
                style={item?.style || {}}
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

export default SaveButton;
