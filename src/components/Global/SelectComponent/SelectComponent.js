import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import InputLabel from '@material-ui/core/InputLabel';

const SelectComponent = ({ value, label, menuItems = [], getValue }) => {
  const handleChange1 = (event) => {
    getValue(event.target.value);
    const value = menuItems.find((value) => value.title === event.target.value);
  };
  return (
    <div style={{ width: '100%' }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
        <Select
          name={label}
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={value || ''}
          onChange={handleChange1}>
          {menuItems.map((item, i) => (
            <MenuItem value={item.title} key={i}>
              {item.title}
            </MenuItem>
          ))}
        </Select>{' '}
      </FormControl>
    </div>
  );
};

export default SelectComponent;
