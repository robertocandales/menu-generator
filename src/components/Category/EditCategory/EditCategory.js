import React, { useState, useEffect, useContext } from 'react';
import AddCategory from '../AddCategory/AddCategory';
import SubCategoryItem from '../SubCategoryItem/SubCategoryItem';
import { fetchTaxes } from '../../../components/../firebase/db/tax';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useForm, Controller } from 'react-hook-form';

import ImageAndSaveButton from '../ImageAndSaveButton/ImageAndSaveButton';
import CategoriesList from '../CategoriesList/CategoriesList';
import { COLORS } from '../../../Utils/Colors/color';
import SkeletonComponent from '../../Global/SkeletonComponent';
import { store } from '../../../context/store';
import { updateCategory } from '../../../firebase/db/category';
import Notification from '../../Global/Notification/Notification';
import { SALES_TAXES_OPTIONS } from '../../../constants/TaxOptions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  icon: {
    marginRight: theme.spacing(1),
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
const EditCategory = ({
  editCategory,
  seteditCategory,
  addCategoryData,
  setAddCategoryData,
  fetchData,
  setThumbnail,
  thumbnail,
  //  DBSalesTaxOptions,
  //  setDBSalesTaxOptions,
  selectSalesTaxOptions,
  setSelectSalesTaxOptions,
  //  data1,
  //  setData1,
  subCategoryList,
  setSsubCategoryList,
  category,
  setcategory,
  resetData,
  setSubCategoryName,
  subCategoryName,
}) => {
  const classes = useStyles();
  const globalState = useContext(store);
  const { editCategoryState, state } = globalState;
  const { edit } = editCategoryState;

  const [data1, setdata1] = useState('');
  const [loading, setloading] = useState(true);
  const [open, setOpen] = useState(false);
  const [errorEndpoint, setErrorEndpoint] = useState({
    message: '',
    isError: false,
    success: false,
  });

  const [DBSalesTaxOptions, setDBSalesTaxOptions] = useState([]);

  React.useEffect(() => {
    setloading(true);
    if (editCategoryState) {
      setdata1(editCategoryState.edit.list);
      setThumbnail(editCategoryState.edit.list.image);
      setloading(false);
    }
  }, [editCategoryState]);

  const { register, errors, handleSubmit, control, reset } = useForm();

  const updateCategoryElement = async (category, selectSalesTaxOptions) => {
    const dbLength = addCategoryData.length;

    const newSubCats = subCategoryList.map((item, i) => ({
      ...item,
      id: dbLength + i,
    }));
    const editIndex = state.categories.findIndex((x) => x.id === editCategoryState.edit.list.id);

    const updatedCategoryObj = {
      //  ...state.categories[editIndex],
      ...editCategoryState.edit.list,
      image: thumbnail,
      title: category,
      subCategories: newSubCats,
      salesTaxIDs: selectSalesTaxOptions.map((item) => item?.id),
      saleTaxes: selectSalesTaxOptions,
    };
    const prevCats = [...addCategoryData];
    prevCats.splice(editIndex, 1, updatedCategoryObj);

    setAddCategoryData(prevCats);
    setSsubCategoryList([...subCategoryList, ...newSubCats]);
    const res = await updateCategory(updatedCategoryObj);
    if (res) {
      //  await fetchData();
      setOpen(true);
      setErrorEndpoint({ message: `  Updated category!`, success: true });
      seteditCategory(false);
      resetData();
    } else {
      setOpen(true);
      setErrorEndpoint({ message: 'Category update error ', isError: true });
    }
  };
  const resetDataEdit = () => {
    //setdata1('');
    setThumbnail('');
    setSsubCategoryList([]);
    setcategory([]);
    setSelectSalesTaxOptions([]);
  };
  const onSubmit = async (data, e) => {
    e.preventDefault();
    updateCategoryElement(category, selectSalesTaxOptions);
  };

  return (
    <>
      <Grid container direction='row' justify='space-around' alignItems='center'>
        {loading ? (
          <SkeletonComponent />
        ) : (
          <form
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: '100%' }}>
            {' '}
            <Typography variant='h6'>Edit Category</Typography>
            <Paper className={classes.paper} elevation={3}>
              <AddCategory
                data1={data1}
                edit={editCategory}
                DBSalesTaxOptions={DBSalesTaxOptions}
                setDBSalesTaxOptions={setDBSalesTaxOptions}
                selectSalesTaxOptions={selectSalesTaxOptions}
                setSelectSalesTaxOptions={setSelectSalesTaxOptions}
                category={category}
                setcategory={setcategory}
              />
            </Paper>
            <Paper className={classes.paper} elevation={3}>
              <SubCategoryItem
                data1={data1}
                edit={editCategory}
                subCategoryList={subCategoryList}
                setSsubCategoryList={setSsubCategoryList}
                seteditCategory={seteditCategory}
                DBSalesTaxOptions={DBSalesTaxOptions}
                setDBSalesTaxOptions={setDBSalesTaxOptions}
                setSubCategoryName={setSubCategoryName}
                subCategoryName={subCategoryName}
              />
            </Paper>
            <Paper className={classes.categoryListItem} elevation={3}>
              <ImageAndSaveButton
                setThumbnail={setThumbnail}
                thumbnail={thumbnail}
                edit={editCategory}
                seteditCategory={seteditCategory}
                setAddCategoryData={setAddCategoryData}
                addCategoryData={addCategoryData}
                resetData={resetData}
              />
            </Paper>{' '}
          </form>
        )}
      </Grid>
      <Notification
        success={errorEndpoint.success}
        error={errorEndpoint.isError}
        message={errorEndpoint.message}
        open={open}
        setOpen={setOpen}
      />{' '}
    </>
  );
};

export default EditCategory;
