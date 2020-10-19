import React, { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import _ from 'lodash';
import { Paper, Grid, Avatar, Button } from '@material-ui/core';
import { store } from '../../../context/store';
import { updateCategory } from '../../../firebase/db/category';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  bigIcon: {
    width: 40,
    height: 'auto',
  },
}));
export const Schema = Yup.object().shape({
  item_ids: Yup.array()
    .transform((ids) => {
      return ids.filter((id) => {
        return id === 0 || id;
      });
    })
    .min(1, 'Select at least one'),
});

const CategoriesListRenew = ({
  addCategoryData = [],
  resetData,
  seteditCategory,
  setisVisibleInDigitalMenu,
  setisVisibleForTakeAway,
  setAddCategoryData,
}) => {
  const classes = useStyles();
  const globalState = useContext(store);
  const { editCategorydispatch } = globalState;

  // const defaultNames = ['43o8lDnAcsrj1fJlxXki', '4GIdtIo1n3IAruUufbgX'];
  const defaultNames = addCategoryData.map((values) => {
    if (values.isVisibleOnMenu) {
      return values.id;
    }
  });
  const defaultNames1 = addCategoryData.map((values) => {
    if (values.isVisibleForTakeAway) {
      return values.id;
    }
  });
  const { control, handleSubmit, errors, getValues } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: { item_ids: defaultNames },
  });

  const [checkedValuesDigitalMenu, setCheckedValuesDigitalMenu] = useState(defaultNames);
  const [checkedValuesTakeAway, setCheckedValuesTakeAway] = useState(defaultNames1);

  // start update checkbox digital menu
  const handleSelectDigitalMenu = (checkedId, addCategoryData, index) => {
    const newIds = checkedValuesDigitalMenu?.includes(checkedId)
      ? checkedValuesDigitalMenu.map((value) => {
          if (value === checkedId) {
            return undefined;
          } else return value;
        })
      : checkedValuesDigitalMenu.map((value, i) => {
          if (i === index) {
            return checkedId;
          } else {
            return value;
          }
        });

    setCheckedValuesDigitalMenu(newIds);
    const result = _.intersectionWith(addCategoryData, newIds, (o, num) => o.id == num);

    const onMenuVisible = {
      ...addCategoryData[index],
      isVisibleOnMenu: newIds[index] !== undefined ? true : false,
    };

    updateMenuCategoryData(index, onMenuVisible);
    return newIds;
  };
  const updateMenuCategoryData = async (index, onMenuVisible) => {
    const updatedCategoryObj = {
      ...onMenuVisible,
    };
    const prevCats = [...addCategoryData];
    prevCats.splice(index, 1, updatedCategoryObj);

    setAddCategoryData(prevCats);
    const res = await updateCategory(updatedCategoryObj);
  };
  // end update checkbox digital menu

  const handleSelectDelivery = (checkedId, addCategoryData, index) => {
    const newIds1 = checkedValuesTakeAway?.includes(checkedId)
      ? checkedValuesTakeAway.map((value) => {
          if (value === checkedId) {
            return undefined;
          } else return value;
        })
      : checkedValuesTakeAway.map((value, i) => {
          if (i === index) {
            return checkedId;
          } else {
            return value;
          }
        });

    setCheckedValuesTakeAway(newIds1);
    const result = _.intersectionWith(addCategoryData, newIds1, (o, num) => o.id == num);

    const takeAwayVisible = {
      ...addCategoryData[index],
      isVisibleForTakeAway: newIds1[index] !== undefined ? true : false,
    };

    updateTakeAwayCategoryData(index, takeAwayVisible);
    return newIds1;
  };
  const updateTakeAwayCategoryData = async (index, takeAwayVisible) => {
    const updatedCategoryObj1 = {
      ...takeAwayVisible,
    };
    const prevCats1 = [...addCategoryData];
    prevCats1.splice(index, 1, updatedCategoryObj1);

    setAddCategoryData(prevCats1);
    const res = await updateCategory(updatedCategoryObj1);
  };

  const editCategoryData = (list) => {
    resetData();
    seteditCategory(true);
    editCategorydispatch({
      type: 'EDIT_CATEGORY',
      data: { list },
    });
  };

  return (
    <form
      onSubmit={handleSubmit((data) => console.log('DATA --->', data))}
      style={{ width: '100%', padding: '10px' }}>
      <FormControl error={!!errors.item_ids?.message} style={{ width: '100%' }}>
        <FormHelperText>{errors.item_ids?.message}</FormHelperText>
        <Grid container direction='row' justify='center' alignItems='center'>
          {/*<Grid item sm={0}></Grid>*/}
          <Grid item sm={3}>
            <div style={{ marginLeft: '-50px' }}>Categories</div>
          </Grid>
          <Grid item sm={2}>
            <div style={{ width: '100px', marginLeft: '-10px', textAlign: 'center' }}>
              Visible on Digital Menu
            </div>
          </Grid>
          <Grid item sm={2}>
            <div style={{ width: '100px', marginLeft: '-10px', textAlign: 'center' }}>
              Visible for take away
            </div>
          </Grid>
          {/*<Grid item sm={2}></Grid>*/}
        </Grid>
        <Controller
          name='categories_selected'
          render={(props) =>
            addCategoryData.map((item, index) => (
              <Grid
                key={index}
                container
                style={{
                  width: '100%',
                  padding: '5px',
                  height: '80px',
                }}>
                {' '}
                <Paper
                  elevation={3}
                  style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                  {' '}
                  <Grid container direction='row' justify='center' alignItems='center'>
                    <Grid item sm={1}>
                      <Avatar alt={item.title} src={item.image} />{' '}
                    </Grid>

                    <Grid item sm={2}>
                      {item.title}
                    </Grid>
                    <Grid item sm={2}>
                      {item.saleTaxes
                        ? item.saleTaxes.map((sales, i) => <div key={i}>{sales.taxPercent}%</div>)
                        : null}{' '}
                    </Grid>
                    <Grid
                      item
                      sm={2}
                      //style={{ marginLeft: '5px' }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={() =>
                              props.onChange(
                                handleSelectDigitalMenu(item.id, addCategoryData, index),
                              )
                            }
                            checked={checkedValuesDigitalMenu?.includes(item.id)}
                          />
                        }
                        //labelPlacement='start'
                        label=''
                      />{' '}
                    </Grid>
                    <Grid
                      item
                      sm={2}
                      //style={{ marginLeft: '5px' }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={() =>
                              props.onChange(handleSelectDelivery(item.id, addCategoryData, index))
                            }
                            checked={checkedValuesTakeAway.includes(item.id)}
                          />
                        }
                        //labelPlacement='start'
                        label=''
                      />{' '}
                    </Grid>

                    <Grid item sm={1}>
                      <Button
                        style={{
                          padding: 10,
                          paddingRight: 0,
                          boxShadow: '0px 1px 3px grey',
                        }}
                        onClick={() => editCategoryData(item)}>
                        <img
                          alt='edit icon'
                          src={'/assets/images/editIcon.png'}
                          className={classes.icon}
                          style={{ width: 20 }}
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>{' '}
              </Grid>
            ))
          }
          control={control}
        />
      </FormControl>
      {/*<pre>SELECTED: {JSON.stringify(getValues(), null, 2)}</pre>
      <button>Submit</button>*/}
    </form>
  );
};

export default CategoriesListRenew;
