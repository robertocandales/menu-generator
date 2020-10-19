import React from 'react';
//import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import useStyles from '@material-ui/core/styles/makeStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import { lime, grey } from '@material-ui/core/colors';
import MuiSwitch from '@material-ui/core/Switch';

const Switch = withStyles({
  switchBase: {
    color: grey[300],
    '&$checked': {
      color: lime['A700'],
    },
    '&$checked + $track': {
      opacity: '1',
      backgroundColor: '#333333',
    },
  },
  checked: {},
  track: {},
})(MuiSwitch);

const SwitchComponent = ({ label = 'default', getValue, value = false }) => {
  const toggleChecked = () => {
    getValue((prev) => !prev);
  };
  return (
    <div>
      <FormControlLabel
        control={<Switch checked={value} onChange={toggleChecked} />}
        label={<div style={{ textAlign: 'center' }}>{label}</div>}
      />
    </div>
  );
};

export default SwitchComponent;
