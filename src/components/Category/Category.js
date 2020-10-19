import React, { useState, useEffect, useContext, useReducer } from 'react';
import AddCategory from './AddCategory/AddCategory';
import SubCategoryItem from './SubCategoryItem/SubCategoryItem';
import { fetchTaxes } from '../../components/../firebase/db/tax';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLORS } from '../../Utils/Colors/color';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useForm, Controller } from 'react-hook-form';
import { SALES_TAXES_OPTIONS } from '../../constants/TaxOptions';
import ImageAndSaveButton from './ImageAndSaveButton/ImageAndSaveButton';
import CategoriesList from './CategoriesList/CategoriesList';
import EditCategory from './EditCategory/EditCategory';
import PrintButton from '../Global/PrintButton/PrintButton';
import { store } from '../../context/store';
import { fetchCategories, saveCategory } from '../../firebase/db/category';
import SkeletonComponent from '../Global/SkeletonComponent';
import Notification from '../Global/Notification/Notification';
import ResetButton from '../Global/ResetButton/ResetButton';
import CategoriesListRenew from './CategoriesList/CategoriesListRenew';
import useI18n from '../../hooks/use-i18n';
import { languages, contentLanguageMap } from '../../i18n/i18n';

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

const Category = () => {
  const i18n = useI18n();

  const globalState = useContext(store);
  const { dispatch } = globalState;
  const classes = useStyles();
  const [data1, setData1] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [addCategoryData, setAddCategoryData] = useState([]);
  const [editCategory, seteditCategory] = useState(false);
  const [loading, setloading] = useState(true);
  const [subCategoryList, setSsubCategoryList] = useState([]);
  const [DBSalesTaxOptions, setDBSalesTaxOptions] = useState([]);
  const [selectSalesTaxOptions, setSelectSalesTaxOptions] = useState([]);
  const [category, setcategory] = useState('');
  const [isVisibleInDigitalMenu, setisVisibleInDigitalMenu] = useState(false);
  const [isVisibleForTakeAway, setisVisibleForTakeAway] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorEndpoint, setErrorEndpoint] = useState({
    message: '',
    isError: false,
    success: false,
  });

  const [subCategoryName, setSubCategoryName] = useState('');
  const fetchData = async () => {
    await fetchCategories()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          addCategoryData.push({
            ...doc.data(),
            id: doc.id,
            docRef: doc.ref,
          });
        });
        if (addCategoryData.length) {
          const user = JSON.parse(localStorage?.getItem('user'));

          setAddCategoryData(
            addCategoryData
              .filter((x) => x.user === user.email)
              .sort(function (a, b) {
                if (a.title > b.title) {
                  return 1;
                }
                if (a.title < b.title) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              }),
          );

          dispatch({
            type: 'ADD_CATEGORY',
            addCategoryData,
          });
          setloading(false);
        }
      })
      .catch((er) => {
        console.log(er);
        setloading(false);
      });
  };

  useEffect(() => {
    setloading(true);
    resetData();
    fetchData();
  }, []);
  const defaultValues = {
    select: '',
    category: '',
  };
  const { register, errors, handleSubmit, control, reset, getValues } = useForm({ defaultValues });

  const sendData = async (category, selectSalesTaxOptions) => {
    if (category === '' || category === undefined) {
      alert('Add category name!');
    } else {
      const dbLength = subCategoryList.length;
      const newSubCats = subCategoryList.map((item, i) => ({
        ...item,
        id: dbLength + i,
      }));
      const newCategoryObj = {
        id: addCategoryData.length + 1,
        image: thumbnail,
        title: category,
        subCategories: newSubCats.map((item) => item?.id),
        salesTaxIDs: selectSalesTaxOptions.map((item) => item?.id),
        saleTaxes: selectSalesTaxOptions,
      };

      const res = await saveCategory(newCategoryObj, newSubCats, DBSalesTaxOptions);
      if (res) {
        setOpen(true);
        setErrorEndpoint({ message: 'Added category ', success: true });
        const prevCats = [...addCategoryData];
        prevCats.push({
          ...newCategoryObj,
          subCategories: newSubCats,
          id: res,
        });

        setAddCategoryData(prevCats);
        setSsubCategoryList([...subCategoryList, ...newSubCats]);

        //  await fetchData();
        resetData();
      } else {
        setOpen(true);
        setErrorEndpoint({ message: 'Category save error ', isError: true });
      }
    }
  };
  const resetData = () => {
    //setdata1('');
    setThumbnail('');
    setSsubCategoryList([]);
    setcategory('');
    setSelectSalesTaxOptions([]);
    setDBSalesTaxOptions([]);
    setSubCategoryName('');
    //seteditCategory(false);
  };
  const onSubmit = async (data, e) => {
    sendData(category, selectSalesTaxOptions);
  };
  return (
    <Grid container direction='column' justify='space-between' alignItems='flex-start'>
      <Grid
        container
        direction='row'
        justify='space-around'
        alignItems='flex-start'
        xs={12}
        item
        spacing={3}>
        {editCategory ? (
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='flex-start'
            item
            md={6}
            sm={12}>
            <EditCategory
              editCategory={editCategory}
              seteditCategory={seteditCategory}
              edit={editCategory}
              setAddCategoryData={setAddCategoryData}
              addCategoryData={addCategoryData}
              data1={data1}
              setData1={setData1}
              fetchData={fetchData}
              setThumbnail={setThumbnail}
              thumbnail={thumbnail}
              DBSalesTaxOptions={DBSalesTaxOptions}
              setDBSalesTaxOptions={setDBSalesTaxOptions}
              selectSalesTaxOptions={selectSalesTaxOptions}
              setSelectSalesTaxOptions={setSelectSalesTaxOptions}
              subCategoryList={subCategoryList}
              setSsubCategoryList={setSsubCategoryList}
              category={category}
              setcategory={setcategory}
              resetData={resetData}
              setSubCategoryName={setSubCategoryName}
              subCategoryName={subCategoryName}
            />
          </Grid>
        ) : (
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='flex-start'
            item
            md={6}
            sm={12}>
            <form
              noValidate
              autoComplete='off'
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: '100%' }}>
              {' '}
              <Typography variant='h6'>Add Category</Typography>
              {/*{i18n.t('add-category')}*/}
              <Paper
                className={classes.paper}
                elevation={3}
                style={{
                  width: '100%',
                  height: '100%',
                }}>
                <AddCategory
                  category={category}
                  setcategory={setcategory}
                  data1={data1}
                  edit={editCategory}
                  DBSalesTaxOptions={DBSalesTaxOptions}
                  setDBSalesTaxOptions={setDBSalesTaxOptions}
                  getValues={getValues}
                  selectSalesTaxOptions={selectSalesTaxOptions}
                  setSelectSalesTaxOptions={setSelectSalesTaxOptions}
                />
              </Paper>
              <Paper className={classes.paper} elevation={3}>
                <SubCategoryItem
                  data1={data1}
                  edit={editCategory}
                  subCategoryList={subCategoryList}
                  setSsubCategoryList={setSsubCategoryList}
                  seteditCategory={seteditCategory}
                  setSubCategoryName={setSubCategoryName}
                  subCategoryName={subCategoryName}
                />
              </Paper>
              <Paper className={classes.categoryListItem} elevation={3}>
                <ImageAndSaveButton
                  setThumbnail={setThumbnail}
                  thumbnail={thumbnail}
                  edit={editCategory}
                  resetData={resetData}
                />
              </Paper>
            </form>
          </Grid>
        )}
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          md={6}
          sm={12}
          style={{ maxHeight: '95vh', overflowY: 'auto' }}>
          <Grid item sm={12}>
            {' '}
            {loading ? (
              <SkeletonComponent />
            ) : (
              <div style={{ width: '100%' }}>
                {' '}
                <CategoriesListRenew
                  addCategoryData={addCategoryData}
                  setAddCategoryData={setAddCategoryData}
                  resetData={resetData}
                  seteditCategory={seteditCategory}
                  setisVisibleInDigitalMenu={setisVisibleInDigitalMenu}
                  setisVisibleForTakeAway={setisVisibleForTakeAway}
                />
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Notification
        success={errorEndpoint.success}
        error={errorEndpoint.isError}
        message={errorEndpoint.message}
        open={open}
        setOpen={setOpen}
      />{' '}
    </Grid>
  );
};

export default Category;
