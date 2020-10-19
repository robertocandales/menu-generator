import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';
import { Day } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const weeksday = [
  {
    name: 'monday',
    value: 1,
    title: 'mon',
  },
  {
    name: 'tuesday',
    value: 2,
    title: 'tue',
  },
  {
    name: 'wednesday',
    value: 3,
    title: 'wen',
  },
  {
    name: 'thursday',
    value: 4,
    title: 'thu',
  },
  {
    name: 'friday',
    value: 5,
    title: 'fri',
  },
];

const DaysField = ({ weekdaysFromTo = { from: 'mon', to: 'fri' }, setWeekdaysFromTo }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');

  const { from, to } = weekdaysFromTo;

  const handleChangeFrom = (event) => {
    console.log(event.target.value);
    setWeekdaysFromTo({ ...weekdaysFromTo, from: event.target.value || '' });
  };
  const handleChangeTo = (event) => {
    console.log(event.target.value);
    setWeekdaysFromTo({ ...weekdaysFromTo, to: event.target.value || '' });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        style={{ textTransform: 'none', padding: 0, marginLeft: -12, marginRight: -10 }}>
        <Typography variant='caption'>
          {' '}
          {weekdaysFromTo?.from?.title && weekdaysFromTo?.to?.title
            ? `${weekdaysFromTo?.from?.title} - ${weekdaysFromTo?.to?.title}`
            : 'weekdays'}{' '}
        </Typography>
      </Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Fill the weekdays</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor='demo-dialog-native'>from</InputLabel>
              <Select value={from || ''} onChange={handleChangeFrom} input={<Input />}>
                {weeksday.map((day) => (
                  <MenuItem key={day.value} value={day}>
                    {day.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-dialog-select-label'>to</InputLabel>
              <Select
                labelId='demo-dialog-select-label'
                id='demo-dialog-select'
                value={to || ''}
                onChange={handleChangeTo}
                input={<Input />}>
                {weeksday.map((day) => (
                  <MenuItem key={day.value} value={day}>
                    {day.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary'>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DaysField;
