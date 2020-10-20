import React from 'react';
//import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import useStyles from '@material-ui/core/styles/makeStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import { lime, grey } from '@material-ui/core/colors';
import MuiSwitch from '@material-ui/core/Switch';
import { COLORS } from '../../../Utils/Colors/color';

const Switch = withStyles({
  switchBase: {
    color: grey[300],
    '&$checked': {
      color: COLORS.PRIMARY,
    },
    '&$checked + $track': {
      opacity: '1',
      backgroundColor: COLORS.SECONDARY,
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
