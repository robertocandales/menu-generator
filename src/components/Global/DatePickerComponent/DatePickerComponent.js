import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const DatePickerComponent = ({ label = 'default', getValue, value = '07:30' }) => {
  const classes = useStyles();

  return (
    <>
      <TextField
        id='time'
        label={label}
        type='time'
        //defaultValue='07:30'
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        style={{ width: '80%' }}
        value={value}
        onChange={(e) => getValue(e.target.value)}
      />
    </>
  );
};

export default DatePickerComponent;
