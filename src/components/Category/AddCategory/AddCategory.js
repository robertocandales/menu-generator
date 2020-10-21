import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InputLabel from '@material-ui/core/InputLabel';
import { FormControl, FormHelperText, Grid } from '@material-ui/core';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';

import Paper from '@material-ui/core/Paper';

import { Wrapper, CustomCard } from './styles';
import { COLORS } from '../../../Utils/Colors/color';
import MyDropDown from './MyDropDown/MyDropDown';
import SelectComponent from './SelectComponent/SelectComponent';
import SalesTaxModal from './SalesTaxModal/SalesTaxModal';
import SelectComponent1 from './SelectComponent/SelectComponent1';
//import { SALES_TAXES_OPTIONS } from '../../../constants/TaxOptions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: '#fff',
    borderRadius: 100,
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

const CATEGORIES = [];
const SUB_CATEGORIES = [];

const AddCategory = ({
  data1,
  edit,
  setsalesTax,
  setporcentTax,
  DBSalesTaxOptions,
  setDBSalesTaxOptions,
  category,
  setcategory,
  selectSalesTaxOptions,
  setSelectSalesTaxOptions,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [vales, setvales] = useState([]);
  const classes = useStyles();

  const toggleAddSalesTaxDialog = () => {
    setIsVisible(!isVisible);
  };
  React.useEffect(() => {
    setcategory(data1.title);
  }, [data1, edit]);

  return (
    <>
      <Grid container direction='row' justify='space-around' alignItems='center'>
        <Grid item sm={12} xs={12}>
          <TextField
            name='category'
            value={category}
            fullWidth
            label='Category'
            id='category'
            margin='dense'
            required
            onChange={(e) => setcategory(e.target.value)}
          />
        </Grid>
        <Grid item sm={12} container direction='row' justify='space-around' alignItems='center'>
          <Grid item sm={11} xs={11}>
            <SelectComponent1
              DBSalesTaxOptions={DBSalesTaxOptions}
              setDBSalesTaxOptions={setDBSalesTaxOptions}
              selectSalesTaxOptions={selectSalesTaxOptions}
              setSelectSalesTaxOptions={setSelectSalesTaxOptions}
              edit={edit}
              data1={data1}
              vales={vales}
              setvales={setvales}
            />{' '}
          </Grid>
          <Grid item sm={1} xs={1}>
            <IconButton color='primary' onClick={toggleAddSalesTaxDialog}>
              <AddCircleIcon style={{ fontSize: 30, marginRight: '-10px' }} />
            </IconButton>
          </Grid>
        </Grid>
        <SalesTaxModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          toggleAddSalesTaxDialog={toggleAddSalesTaxDialog}
          data1={data1}
          edit={edit}
          setsalesTax={setsalesTax}
          setporcentTax={setporcentTax}
          DBSalesTaxOptions={DBSalesTaxOptions}
          setDBSalesTaxOptions={setDBSalesTaxOptions}
          vales={vales}
          setvales={setvales}
        />
      </Grid>
    </>
  );
};

export default AddCategory;
