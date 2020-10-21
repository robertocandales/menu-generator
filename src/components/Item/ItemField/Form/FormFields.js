import React, { useState, useContext, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import SelectComponent from '../../../Global/SelectComponent/SelectComponent';
import CheckboxComponent from '../../../Global/CheckboxComponent/CheckboxComponent';
import { store } from '../../../../context/store';
import { SUB_CATEGORIES } from '../../../../constants/subCategories';
import { AVAILABLE_LOCATIONS } from '../../../../constants/locations';
import { fetchCategories } from '../../../../firebase/db/category';
import ResetButton from '../../../Global/ResetButton/ResetButton';
import SaveButton from '../../../Global/SaveButton/SaveButton';
import ResetAndSaveButton from './ResetAndSaveButton/ResetAndSaveButton';
import SelectMultiple from './SelectMultiple/SelectMultiple';

const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: '#fff',
    borderRadius: 100,
  },
}));
const allergens = [
  {
    title: 'Gluten',
  },
  {
    title: 'Crustáceos',
  },
  {
    title: 'Huevos',
  },
  {
    title: 'Cacahuete',
  },
  {
    title: 'Soja',
  },
  {
    title: 'Lácteos',
  },
  {
    title: 'Pescado',
  },
  {
    title: 'Apio',
  },
  {
    title: 'Mostaza',
  },
  {
    title: 'Sésamo',
  },
  {
    title: 'Dióxido de azufre y sulfitos',
  },
  {
    title: 'Altramuces',
  },
  {
    title: 'Frutos de cáscara',
  },
  {
    title: 'Moluscos',
  },
];

const FormFields = ({
  setData,
  data,
  addOrUpdateItem,
  itemName,
  setItemName,
  priceValue,
  setPriceValue,
  takeAwayValue,
  setTakeAwayValue,
  visibleDigitalMenu,
  setVisibleDigitalMenu,
  visibleTakeAway,
  setVisibleTakeAway,
  location,
  setLocation,
  subCategories,
  setSubCategories,
  categories,
  setCategories,
  categoryValue,
  setCategoryValue,
  subcategoryValue,
  setSubcategoryValue,
  locationValue,
  setLocationValue,
  allergensValue,
  setAllergensValue,
}) => {
  const globalState = useContext(store);
  const { state } = globalState;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (categories.length) {
      const subCat = categories.find((sub) => sub.title === categoryValue);
      if (subCat) {
        setSubCategories(subCat.subCategories);
      }
    }
  }, [categories, categoryValue]);
  return (
    <>
      <Paper style={{ padding: '10px', width: '100%', height: '100%' }} elevation={4}>
        <Grid container direction='column' justify='center' alignItems='stretch' item>
          <Grid xs={12} md={12} item container direction='row' justify='center' alignItems='center'>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <TextField
                  name='Name'
                  label='Name'
                  onChange={(e) => setItemName(e.target.value)}
                  value={itemName}
                />
              </FormControl>
            </Grid>
            <Grid item sm={2} xs={12}>
              <CheckboxComponent
                name='visibleOnDigitalMenu'
                label='Visible on Digital Menu'
                getValue={setVisibleDigitalMenu}
                value={visibleDigitalMenu}
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <CheckboxComponent
                name='visibleForTakeAway'
                label='Visible For Take Away'
                getValue={setVisibleTakeAway}
                value={visibleTakeAway}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
            item
            sm={6}
            xs={12}>
            <Grid item sm={3} xs={12}>
              <FormControl fullWidth>
                <TextField
                  name='Price'
                  label='Price'
                  onChange={(e) => setPriceValue(e.target.value)}
                  value={priceValue}
                  type='number'
                />
              </FormControl>
            </Grid>
            <Grid item sm={3} xs={12}>
              <FormControl>
                <TextField
                  name='TakeAwayPrice'
                  label='Delivery price'
                  onChange={(e) => setTakeAwayValue(e.target.value)}
                  value={takeAwayValue}
                  type='number'
                />{' '}
              </FormControl>
            </Grid>

            <Grid item sm={3} xs={12}>
              <SelectMultiple
                menuItems={allergens}
                getValue={setAllergensValue}
                value={allergensValue}
              />
            </Grid>
          </Grid>
          <Grid container direction='row' justify='space-between' alignItems='center' item>
            <Grid
              item
              container
              direction='row'
              justify='space-between'
              alignItems='center'
              sm={6}
              xs={12}>
              <Grid item sm={3} xs={12}>
                <SelectComponent
                  name='category'
                  label='Select Category'
                  menuItems={categories && !loading ? categories : []}
                  getValue={setCategoryValue}
                  value={categoryValue}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <SelectComponent
                  name='subCategory'
                  label='Select Sub Category'
                  menuItems={subCategories ? subCategories : []}
                  getValue={setSubcategoryValue}
                  value={subcategoryValue}
                />
              </Grid>
            </Grid>
            <Grid item sm={6} xs={12}>
              <ResetAndSaveButton />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default FormFields;
