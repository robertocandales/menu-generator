import React, { useEffect, useContext, useState } from 'react';
import { store } from '../../../../context/store';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
//import { colourOptions } from '../data';
import { COLORS } from '../../../../Utils/Colors/color';
import { Controller } from 'react-hook-form';
import { fetchTaxes } from '../../../../firebase/db/tax';
import SkeletonComponent from '../../../Global/SkeletonComponent';
const animatedComponents = makeAnimated();

export default function Component1({
  edit,
  data1,
  DBSalesTaxOptions = [],
  setDBSalesTaxOptions,
  selectSalesTaxOptions = [],
  setSelectSalesTaxOptions,
  vales,
  setvales,
  ...props
}) {
  const globalState = useContext(store);
  const { addOptionsTaxDispatch, editCategoryState, addOptionsTax } = globalState;
  const [loading, setLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(true);
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

          const array = taxes.map((a) => {
            const pa = {
              value: a.id,
              label: `${a.title} (${a.taxPercent}%)`,
              id: a.id,
              title: a.title,
              taxPercent: a.taxPercent,
            };
            return pa;
          });

          setvales(array);
          setDBSalesTaxOptions(taxes);
          const data = taxes;
          addOptionsTaxDispatch({
            type: 'ADD_TAX_OPTIONS',
            data,
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

  useEffect(() => {
    setEditLoading(true);
    if (edit && editCategoryState) {
      setSelectSalesTaxOptions(editCategoryState.edit.list.saleTaxes);
      const def = editCategoryState.edit.list.saleTaxes.map((a) => {
        const pa = {
          value: a.id,
          label: `${a.title} (${a.taxPercent}%)`,
          id: a.id,
          title: a.title,
          taxPercent: a.taxPercent,
        };
        return pa;
      });
      setSelectSalesTaxOptions(def);
      setEditLoading(false);
    }
  }, [editCategoryState, addOptionsTax]);

  const handleChange = (options) => {
    if (options) {
      setSelectSalesTaxOptions(options);
    } else {
      //  alert('Add sales tax value!');
      setSelectSalesTaxOptions([]);
    }
  };
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      //  borderBottom: '1px solid black',
      color: state.isSelected ? 'red' : 'black',
      padding: 10,
    }),

    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: '100%',
      display: 'flex',
      borderBottom: '1px solid #616161',
      '&:hover': { borderColor: '#afb42b', borderBottom: '1.5px solid #afb42b' },
      //  '&:focus': { borderColor: 'yellow' },
      transition: '&:hover 1s',
      //  backgroundColor: 'red',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };
  return (
    <div style={{ width: '100%' }}>
      <Select
        loadingIndicator={loading || editLoading}
        placeholder={<div style={{ marginLeft: '-8px' }}>Select sales tax</div>}
        closeMenuOnSelect={false}
        value={selectSalesTaxOptions}
        components={animatedComponents}
        //defaultValue={edit && !editLoading ? editValues : ''}
        onChange={handleChange}
        isMulti
        options={vales}
        styles={customStyles}
        //theme={(theme) => ({
        //  ...theme,
        //  borderRadius: 10,
        //  outline: 'none',
        //  colors: {
        //    ...theme.colors,
        //    primary25: 'grey',
        //    primary: 'black',
        //  },
        //})}
      />
    </div>
  );
}
