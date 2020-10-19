import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const CheckboxComponent = ({ label, getValue, value = false }) => {
  const handleChange = (event) => {
    getValue(event.target.checked);
  };
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={value ? value : false}
            value={value && value !== undefined ? value : false}
            onChange={handleChange}
            name={label}
          />
        }
        label={label}
      />
    </div>
  );
};

export default CheckboxComponent;
