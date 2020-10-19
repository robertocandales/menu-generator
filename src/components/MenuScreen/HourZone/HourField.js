import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  TimePicker,
} from '@material-ui/pickers';

const HourField = ({ label, time, setTime }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TimePicker ampm={false} label={label} value={time} onChange={setTime} />
    </MuiPickersUtilsProvider>
  );
};

export default HourField;
