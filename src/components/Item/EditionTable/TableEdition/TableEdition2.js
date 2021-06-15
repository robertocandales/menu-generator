import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import { store } from '../../../../context/store';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { deleteProduct, deleteProducts, updateProduct } from '../../../../firebase/db/product';
import HeaderBar from '../HeaderBar/HeaderBar';
import FuzzySearch from 'fuzzy-search';
import PrintButton from '../../../Global/PrintButton/PrintButton';

const TableEdition2 = ({
  allItemsData,
  setAllItemsData,
  setBackupAllItemsData,
  backupAllItemsData,
  categories,
  categoryValue = '',
  setCategoryValue,
  showEditDataFromTable,
  setShowEditDataFromTable,
  query,
  setQuery,
}) => {
  const globalState = useContext(store);
  const { editProductDispatch } = globalState;
  //  const [query, setQuery] = useState('');
  //  const [editDataRow, setEditDataRow] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const COLUMNS = [
    { title: 'Name', field: 'name', emptyValue: 0 },
    {
      title: 'Price ($)',
      field: 'price',
      emptyValue: 0,
      //  type: 'currency',
    },
    {
      title: 'Delivery ($)',
      field: 'takeAwayPrice',
      emptyValue: 0,
      //  type: 'currency',
    },
    {
      title: 'Category',
      field: 'category',
      editComponent: (props) => {
        return (
          <FormControl>
            <InputLabel>Category</InputLabel>
            <Select
              value={props.value}
              onChange={(e) => {
                var data = { ...props.rowData };
                const title = e.target.value;
                data.category = title;
                data.subCategory = '';
                props.onRowDataChange(data);
              }}>
              {categories.length > 0 ? (
                categories.map((item) => (
                  <MenuItem key={item.id} value={item.title}>
                    {item.title}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={'none'} disabled>
                  No category found
                </MenuItem>
              )}
            </Select>
          </FormControl>
        );
      },
    },
    {
      title: 'Subcategory',
      field: 'subCategory',
      editComponent: (props) => {
        const obj = categories.find((item) => item.title === props.rowData.category);

        let menuItemsArray = [];
        if (obj) {
          menuItemsArray = obj.subCategories;
        }

        return (
          <FormControl>
            <InputLabel>Subcategory</InputLabel>
            <Select
              value={props.value}
              onChange={(e) => {
                var data = { ...props.rowData };
                const title = e.target.value;
                data.subCategory = title;
                props.onRowDataChange(data);
              }}>
              {menuItemsArray.length > 0 && (
                <MenuItem value={null} disabled>
                  select
                </MenuItem>
              )}
              {menuItemsArray.length > 0 ? (
                menuItemsArray.map((item) => (
                  <MenuItem key={item.id} value={item.title}>
                    {item.title}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Sub - Category found</MenuItem>
              )}
            </Select>
          </FormControl>
        );
      },
    },
    {
      title: 'Visible-on-digital-menu',
      field: 'isVisibleDigitalMenu',
      emptyValue: 0,
      type: 'boolean',
      editable: 'always',
    },
    {
      title: 'Visible-for-takeaway',
      field: 'isVisibleTakeAway',
      emptyValue: 0,
      type: 'boolean',
      editable: 'always',
    },
  ];
  const categorySelected = allItemsData.filter((selected) => selected.category === categoryValue);

  const handlerFilterSearchBar = (searchValue, isSubCat) => {
    // fuzzy config
    if (backupAllItemsData.length > 0) {
      let fieldsToFilter = Object.keys(backupAllItemsData[0]);
      const searcher = new FuzzySearch(backupAllItemsData, fieldsToFilter, {
        caseSensitive: false,
      });
      // fuzzy search
      let result = searcher.search(
        isSubCat && !searchValue ? selectedCategoryFilter?.title : searchValue,
      );

      setAllItemsData([...result]);
      setQuery(searchValue || '');
    }
  };
  return (
    <Grid item>
      <MaterialTable
        title=''
        columns={COLUMNS}
        data={categoryValue !== '' && !showEditDataFromTable ? categorySelected : allItemsData}
        //data={allItemsData}
        style={{
          boxShadow: '0px 0px 0px transparent',
          backgroundColor: 'transparent',
        }}
        options={{
          actionsColumnIndex: COLUMNS.length,
          selection: true,
          selectionProps: {
            color: 'primary',
          },
          draggable: false,
          cellStyle: {
            textAlign: 'left',
          },
          exportButton: true,
          searchText: query,
          exportDelimiter: ';',
        }}
        actions={[
          {
            tooltip: 'Remove All Selected',
            icon: 'delete',
            onClick: (_evt, data) => {
              let isConfirm = window.confirm('You want to delete ' + data.length + ' rows');
              if (isConfirm) {
                setAllItemsData((prevState) => {
                  const prevData = [...prevState];
                  data.forEach((selectedItem) => {
                    deleteProducts(selectedItem);
                    prevData.forEach((item, index) => {
                      if (item.id === selectedItem.id) prevData.splice(index, 1);
                    });
                  });
                  return prevData;
                });
              }
            },
          },
        ]}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setAllItemsData((prevState) => {
                const dataUpdate = [...prevState];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setBackupAllItemsData((prevBackup) => {
                  const dataUpdateBackup = [...prevBackup];
                  const objIndex = dataUpdateBackup.findIndex(
                    (backupItem) => backupItem.id === dataUpdate[index].id,
                  );
                  dataUpdateBackup.splice(objIndex, 1, newData);
                  return dataUpdateBackup;
                });
                updateProduct(newData);
                return dataUpdate;
              });
              resolve();
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setAllItemsData((prevState) => {
                const dataDelete = [...prevState];
                const index = oldData.tableData.id;
                deleteProduct(prevState[index].id);
                dataDelete.splice(index, 1);
                return dataDelete;
              });
              resolve();
            }),
        }}
        onRowClick={(_e, rowData) => {
          editProductDispatch({ type: 'EDIT_PRODUCT', data: rowData });
          setShowEditDataFromTable(true);
        }}
        onSearchChange={handlerFilterSearchBar}
        onSelectionChange={(data) => {
          setSelectedRows([...data]);
        }}
      />
    </Grid>
  );
};

export default TableEdition2;
