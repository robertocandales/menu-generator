import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormFields from './Form/FormFields';
import withStyles from '@material-ui/core/styles/withStyles';
import DigitalMenuDescription from './Form/DigitalMenuDescription';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';
import { AVAILABLE_LOCATIONS } from '../../../constants/locations';
import { SUB_CATEGORIES } from '../../../constants/subCategories';
import { store } from '../../../context/store';
import {
  saveProduct,
  updateProduct,
  fetchProducts,
  batchedUpdate,
} from '../../../firebase/db/product';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: 'red',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const ItemField = ({
  allItemsData,
  setAllItemsData,
  backupAllItemsData,
  setBackupAllItemsData,
  categories,
  setCategories,
  subCategories,
  setSubCategories,
  categoryValue,
  setCategoryValue,
  setQuery,
  allergensValue,
  setAllergensValue,
}) => {
  const addOrUpdateItem = async (newData) => {
    if (data.name === undefined || data.name === '') {
      alert('Please enter item name!', 'error');
      return;
    }
    if (!data.price) {
      alert('Please enter price for item!', 'error');
      return;
    }
    if (!data.category) {
      alert('Please select category!', 'error');
      return;
    }

    // computation here

    let newItem = {
      name: data.name,
      price: data.price,
      takeAwayPrice: data.takeAwayPrice,
      category: data.category?.title || '',
      subCategory: data.subCategory?.title || '',
      categoryId: data.category.id,
      isVisibleDigitalMenu: data?.isVisibleDigitalMenu || false,
      isVisibleTakeAway: data?.isVisibleTakeAway || false,
      image: data.picture,
      description: data.digitalMenuDescription,
      allergensValue: data.allergensValue,
    };

    const dataAdd = [...allItemsData];
    if (selectedRowIndexToUpdate !== null && selectedRowIndexToUpdate >= 0) {
      // update here

      const itemToBeUpdated = {
        ...newItem,
        id: dataAdd[selectedRowIndexToUpdate].id,
      };

      updateProduct(itemToBeUpdated);
      dataAdd.splice(selectedRowIndexToUpdate, 1, itemToBeUpdated);
      setSelectedRowIndexToUpdate(null);
    } else {
      // add here
      const itemId = await saveProduct(newItem);
      newItem = {
        ...newItem,
        id: itemId,
      };

      dataAdd.push(newItem);
    }
    setAllItemsData(dataAdd);
    setBackupAllItemsData([dataAdd]);

    resetData();
  };

  const globalState = useContext(store);
  const { itemResetDataDispatch, itemResetDataState, editProductState } = globalState;
  const { editAproduct } = editProductState;
  const { register, errors, handleSubmit, control, reset, getValues } = useForm({});

  const [itemName, setItemName] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [takeAwayValue, setTakeAwayValue] = useState('');
  const [visibleDigitalMenu, setVisibleDigitalMenu] = useState(false);
  const [visibleTakeAway, setVisibleTakeAway] = useState(false);
  const [location, setLocation] = useState(AVAILABLE_LOCATIONS); // future, now is static value

  const [subcategoryValue, setSubcategoryValue] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [picture, setPicture] = useState(null);
  const [menuDescription, setMenuDescription] = useState('');
  const [selectedRowIndexToUpdate, setSelectedRowIndexToUpdate] = useState(null);
  const [activateEndpoint, setActivateEndpoint] = useState(false);
  const classes = useStyles();
  const [data, setData] = useState({
    name: '',
    price: '',
    takeAwayPrice: '',
    vDigitalMenu: '',
    vTakeAway: '',
    category: [],
    subCategory: [],
    location: [],
    digitalMenuDescription: '',
    allergensValue: [],
  });
  const submitHandler = (e) => {
    e.preventDefault();

    setData({
      name: itemName,
      price: priceValue,
      takeAwayPrice: takeAwayValue,
      isVisibleDigitalMenu: visibleDigitalMenu,
      isVisibleTakeAway: visibleTakeAway,
      category: categories.find((value) => value.title === categoryValue),
      subCategory: subCategories?.find((value) => value.title === subcategoryValue),
      location: location.find((value) => value.title === locationValue),
      picture: picture,
      digitalMenuDescription: menuDescription,
      allergensValue: allergensValue,
    });
    setActivateEndpoint(true);
  };
  useEffect(() => {
    if (activateEndpoint) {
      addOrUpdateItem(data);
      setActivateEndpoint(false);
    }
  }, [data]);
  const resetData = () => {
    setItemName('');
    setPriceValue('');
    setTakeAwayValue('');
    setVisibleTakeAway(false);
    setVisibleDigitalMenu(false);
    //setCategories([]);
    setCategoryValue('');
    setSubcategoryValue('');
    setLocationValue('');
    setPicture('');
    setMenuDescription('');
    setQuery('');
    setAllergensValue([]);
  };
  React.useEffect(() => {
    if (itemResetDataState.reseting) {
      resetData();
      itemResetDataDispatch({
        type: 'RESET_DATA',
        data: false,
      });
    }
  }, [itemResetDataState]);
  useEffect(() => {
    if (editAproduct) {
      console.log(editAproduct);
      setItemName(editAproduct.name);
      setPriceValue(editAproduct.price);
      setTakeAwayValue(editAproduct.takeAwayPrice);
      setVisibleDigitalMenu(editAproduct.isVisibleDigitalMenu);
      setVisibleTakeAway(editAproduct.isVisibleTakeAway);
      setCategoryValue(editAproduct.category);
      setSubcategoryValue(editAproduct.subCategory);
      setLocationValue('');
      setPicture(editAproduct.image);
      setMenuDescription(editAproduct.description);
      setSelectedRowIndexToUpdate(editAproduct.tableData.id);
      setAllergensValue(editAproduct.allergensValue);
    }
  }, [editProductState]);
  return (
    <div style={{ width: '100%' }}>
      <Accordion defaultExpanded>
        <AccordionSummary
          style={{ width: '100%' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          {/*<Typography className={classes.heading}>Item Details</Typography>*/}
        </AccordionSummary>
        <AccordionDetails style={{ marginTop: '-30px', marginLeft: -20 }}>
          <form
            noValidate
            onSubmit={(e) => submitHandler(e)}
            type='submit'
            id='hook-form'
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}>
            <Grid
              item
              md={12}
              sm={12}
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={4}>
              <Grid item md={8} sm={12}>
                <FormFields
                  setData={setData}
                  data={data}
                  itemName={itemName}
                  setItemName={setItemName}
                  priceValue={priceValue}
                  setPriceValue={setPriceValue}
                  takeAwayValue={takeAwayValue}
                  setTakeAwayValue={setTakeAwayValue}
                  visibleDigitalMenu={visibleDigitalMenu}
                  setVisibleDigitalMenu={setVisibleDigitalMenu}
                  visibleTakeAway={visibleTakeAway}
                  setVisibleTakeAway={setVisibleTakeAway}
                  location={location}
                  setLocation={setLocation}
                  subCategories={subCategories}
                  setSubCategories={setSubCategories}
                  categories={categories}
                  setCategories={setCategories}
                  categoryValue={categoryValue}
                  setCategoryValue={setCategoryValue}
                  subcategoryValue={subcategoryValue}
                  setSubcategoryValue={setSubcategoryValue}
                  locationValue={locationValue}
                  setLocationValue={setLocationValue}
                  allergensValue={allergensValue}
                  setAllergensValue={setAllergensValue}
                />
              </Grid>

              <Grid md={4} sm={12} item>
                {' '}
                <DigitalMenuDescription
                  setData={setData}
                  data={data}
                  picture={picture}
                  setPicture={setPicture}
                  menuDescription={menuDescription}
                  setMenuDescription={setMenuDescription}
                />
              </Grid>
            </Grid>{' '}
          </form>
          {/*<Typography></Typography>*/}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ItemField;
