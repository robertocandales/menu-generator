import React, { useState, useContext, useEffect } from 'react';
import MdPrint from 'react-ionicons/lib/MdPrint';
import MdRefresh from 'react-ionicons/lib/MdRefresh';
import MdNotifications from 'react-ionicons/lib/MdNotifications';
import Search from '@material-ui/icons/Search';
import MdSave from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import { useForm } from 'react-hook-form';
import { COLORS } from '../../../../../Utils/Colors/color';
import { store } from '../../../../../context/store';
import { Button } from '@material-ui/core';

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
const ResetAndSaveButton = () => {
  const globalState = useContext(store);
  const { itemResetDataDispatch } = globalState;

  const { handleSubmit } = useForm();
  const resetDataFormData = () => {
    itemResetDataDispatch({
      type: 'RESET_DATA',
      data: true,
    });
  };
  const classes = useStyles();
  const BUTTONS = [
    {
      title: 'Reset',
      icon: <MdRefresh className={classes.icon} />,
      onPress: () => resetDataFormData(),
      style: { backgroundColor: COLORS.WHITE },
    },
    {
      title: 'Save',
      icon: <MdSave className={classes.icon} />,
      onPress: () => handleSubmit(),
      style: { backgroundColor: COLORS.PRIMARY },
    },
  ];
  return (
    <Grid container spacing={3} justify='space-around' alignItems='center'>
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

export default ResetAndSaveButton;
