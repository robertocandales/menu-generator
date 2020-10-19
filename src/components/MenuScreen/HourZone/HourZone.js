import React from 'react';
import { Grid } from '@material-ui/core';
import DatePickerComponent from '../../Global/DatePickerComponent/DatePickerComponent';
import Typography from '@material-ui/core/Typography';
import HourField from './HourField';
import DaysField from './DaysField';

const HourZone = ({ TimePickers, weekdaysFromTo, setWeekdaysFromTo }) => {
  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      sm={12}
      item
      style={{ padding: '10px' }}>
      <Grid item sm={12}>
        Hours
      </Grid>

      {TimePickers.map((item, i) => (
        <Grid key={i.toString()} container spacing={2} alignItems='center'>
          <Grid item xs>
            <Typography variant='caption'>
              {item.label === 'mon-fri' ? (
                <DaysField weekdaysFromTo={weekdaysFromTo} setWeekdaysFromTo={setWeekdaysFromTo} />
              ) : (
                item.label
              )}{' '}
            </Typography>
          </Grid>
          <Grid item xs>
            <HourField label='From' time={item.from[0]} setTime={item.from[1]} />
          </Grid>
          <Grid item xs>
            <HourField label='To' time={item.to[0]} setTime={item.to[1]} />
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default HourZone;
