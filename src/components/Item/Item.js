import React, { useState, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './Header/Header';
import CategorySlider from './CategorySlider/CategorySlider';
import ItemField from './ItemField/ItemField';
import EditionTable from './EditionTable/EditionTable';
import { store } from '../../context/store';
import {
  saveProduct,
  updateProduct,
  fetchProducts,
  batchedUpdate,
} from '../../firebase/db/product';
import { fetchCategories } from '../../firebase/db/category';
import SkeletonComponent from '../Global/SkeletonComponent';

const Item = () => {
  const globalState = useContext(store);
  const { productDispatch } = globalState;
  const [allItemsData, setAllItemsData] = useState([]);
  const [backupAllItemsData, setBackupAllItemsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryValue, setCategoryValue] = useState('');
  const [showEditDataFromTable, setShowEditDataFromTable] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [allergensValue, setAllergensValue] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage?.getItem('user'));

    const fetchProductsFromDB = () => {
      fetchProducts()
        .then((snapshot) => {
          let items = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          const pr = items.filter((x) => x.user === user.email);
          productDispatch({ type: 'GET_PRODUCTS', data: pr });
          setAllItemsData(pr);
          setBackupAllItemsData(pr);
        })
        .catch((er) => {
          console.log('error');
          console.log(er);
        });
    };
    fetchProductsFromDB();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            categories.push({
              ...doc.data(),
              id: doc.id,
              docRef: doc.ref,
            });
          });
          const user = JSON.parse(localStorage?.getItem('user'));

          if (categories.length) {
            setCategories(
              categories
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
            setSubCategories(categories.subCategories);
            setLoading(false);
          }
        })
        .catch((er) => {
          console.log('error');
          console.log(er);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      <Grid container direction='column' spacing={2}>
        <Grid item sm={12} md={12} xs={12} container>
          {loading ? (
            <SkeletonComponent />
          ) : (
            <CategorySlider
              categories={categories}
              setCategories={setCategories}
              setCategoryValue={setCategoryValue}
              showEditDataFromTable={showEditDataFromTable}
              setShowEditDataFromTable={setShowEditDataFromTable}
            />
          )}
        </Grid>
        <Grid item sm={12} md={12} xs={12} container>
          {loading ? (
            <SkeletonComponent />
          ) : (
            <ItemField
              allItemsData={allItemsData}
              setAllItemsData={setAllItemsData}
              backupAllItemsData={backupAllItemsData}
              setBackupAllItemsData={setBackupAllItemsData}
              categories={categories}
              setCategories={setCategories}
              subCategories={subCategories}
              setSubCategories={setSubCategories}
              categoryValue={categoryValue}
              setCategoryValue={setCategoryValue}
              setQuery={setQuery}
              allergensValue={allergensValue}
              setAllergensValue={setAllergensValue}
            />
          )}
        </Grid>
        <Grid item sm={12} md={12} xs={12} container>
          <EditionTable
            allItemsData={allItemsData}
            setAllItemsData={setAllItemsData}
            setBackupAllItemsData={setBackupAllItemsData}
            backupAllItemsData={backupAllItemsData}
            categories={categories}
            categoryValue={categoryValue}
            setCategoryValue={setCategoryValue}
            showEditDataFromTable={showEditDataFromTable}
            setShowEditDataFromTable={setShowEditDataFromTable}
            query={query}
            setQuery={setQuery}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Item;
