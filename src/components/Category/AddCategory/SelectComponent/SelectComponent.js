import React, { useEffect, useContext, useState } from 'react';

import { store } from '../../../../context/store';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl, FormHelperText } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { COLORS } from '../../../../Utils/Colors/color';
import { Controller } from 'react-hook-form';
import { fetchTaxes } from '../../../../firebase/db/tax';

const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  icon: {
    marginRight: theme.spacing(1),
    width: 100,
    height: 50,
    marginTop: -10,
    marginRight: -5,
  },
  bigIcon: {
    width: 40,
    height: 'auto',
  },
  mainContainer: {
    marginTop: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(5),
    paddingTop: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  optionSelector: {
    marginTop: theme.spacing(3),
    minWidth: 300,
    maxWidth: 500,
  },
  subCategory: {
    padding: theme.spacing(0.8),
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    minWidth: theme.spacing(8),
    textAlign: 'center',
    display: 'inline-flex',
    backgroundColor: COLORS.PRIMARY,
    fontSize: theme.spacing(1.6),
    borderRadius: theme.spacing(0.5),
    boxShadow: '1px 1px 3px grey',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryListItem: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  const res = personName.find((item) => item.title === name.title);

  return {
    fontWeight: res ? (res.title === name ? '500' : theme.typography.fontWeightMedium) : null,
    color: res ? (res.title === name ? 'red' : theme.typography.fontWeightMedium) : null,
    backgroundColor: res ? (res.title === name ? 'red' : theme.typography.fontWeightMedium) : null,
  };
}

const SelectComponent = ({
  edit,
  data1,
  DBSalesTaxOptions = [],
  setDBSalesTaxOptions,
  selectSalesTaxOptions = [],
  setSelectSalesTaxOptions,
  NewOnChange,
  ...props
}) => {
  const globalState = useContext(store);
  const { addOptionsTaxDispatch, editCategoryState } = globalState;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [editValues, setEditValues] = useState([]);

  const handleChange = (e) => {
    const values = e.target.value;
    NewOnChange(values);
    //if (edit) {
    //  setEditValues(e.target.value);
    //} else {
    //  setSelectSalesTaxOptions(e.target.value);
    //}
  };

  useEffect(() => {
    const user = JSON.parse(localStorage?.getItem('user'));

    setLoading(true);
    const fetchTaxesFromDB = () => {
      fetchTaxes()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            DBSalesTaxOptions.push({
              ...doc.data(),
              id: doc.id,
              docRef: doc.ref,
            });
          });
          const taxes = DBSalesTaxOptions.filter((x) => x.user === user.email);

          setDBSalesTaxOptions(taxes);
          addOptionsTaxDispatch({
            type: 'ADD_TAX_OPTIONS',
            taxes,
          });
          setLoading(false);
        })
        .catch((er) => {
          console.log('error');
          console.log(er);
          setLoading(false);
        });
    };
    fetchTaxesFromDB();
  }, []);
  //  useEffect(() => {
  //    if (edit && editCategoryState) {
  //      setSelectSalesTaxOptions(editCategoryState.edit.list.saleTaxes);
  //    }
  //  }, [editCategoryState]);
  const label = 'Select sales tax';
  return (
    <div>
      <FormControl className={classes.optionSelector} fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          {...props}
          inputProps={{
            classes: {
              icon: classes.icon,
            },
          }}
          multiple
          value={selectSalesTaxOptions}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) =>
            selected.map((o) => `${o?.title} (${o?.taxPercent}%)`).join(', ')
          }
          MenuProps={MenuProps}>
          <MenuItem value={null}>{label}</MenuItem>
          {DBSalesTaxOptions.length > 0 ? (
            DBSalesTaxOptions.map((item, i) => (
              <MenuItem key={i} value={item}>
                <Checkbox
                  checked={selectSalesTaxOptions.findIndex((o) => o?.title === item?.title) > -1}
                />
                <ListItemText primary={item?.title} secondary={`${item?.taxPercent}%`} />
              </MenuItem>
            ))
          ) : (
            <MenuItem value={'none'} disabled>
              No items{' '}
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectComponent;
