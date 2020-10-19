import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { COLORS } from '../../../../Utils/Colors/color';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { Controller } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import { store } from '../../../../context/store';
import { fetchTaxes } from '../../../../firebase/db/tax';
import SkeletonComponent from '../../../Global/SkeletonComponent';

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
    width: '40',
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MyDropDown = ({
  data1,
  control,
  register,
  errors,
  label = '',
  noItemFoundText = '',
  value = '',
  onChange,
  edit,
  DBSalesTaxOptions = [],
  setDBSalesTaxOptions,
  getValues,
  ...props
}) => {
  const globalState = useContext(store);
  const { addOptionsTaxDispatch } = globalState;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [selectedSalesTax, setSelectedSalesTax] = useState([]);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
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

  const handleChange = (event) => {
    setSelectedSalesTax(event.target.value);
  };
  return (
    <div>
      {loading ? (
        <SkeletonComponent />
      ) : (
        <div>
          <FormControl
            fullWidth
            className={classes.optionSelector}
            error={Boolean(errors.wordlevel)}>
            <InputLabel>{label}</InputLabel>
            <Controller
              as={
                <Select
                  {...props}
                  inputProps={{
                    classes: {
                      icon: classes.icon,
                    },
                  }}
                  multiple
                  //  value={value}
                  //  input={<Input />}
                  MenuProps={MenuProps}
                  rules={{ required: 'this is required' }}
                  renderValue={(selected) =>
                    selected.map((o) => `${o?.title} (${o?.taxPercent}%)`).join(', ')
                  }>
                  <MenuItem disabled value=''>
                    {label}
                  </MenuItem>
                  {DBSalesTaxOptions.length > 0 && loading === false ? (
                    DBSalesTaxOptions.map((item, i) => (
                      <MenuItem key={i} value={item}>
                        <Checkbox
                          checked={
                            DBSalesTaxOptions.findIndex((o) => o?.title === item?.title) > -1
                          }
                        />

                        <ListItemText primary={item?.title} secondary={`${item?.taxPercent}%`} />
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value={'none'} disabled>
                      {noItemFoundText}
                    </MenuItem>
                  )}
                </Select>
              }
              name='select'
              control={control}
              defaultValue={edit ? data1.saleTaxes : []}
              native={false}
              //  rules={{ required: true }}
            />
          </FormControl>
          <Typography color='error' variant='caption' display='block' className='classes.textColor'>
            {' '}
            {errors?.select?.message}
          </Typography>
        </div>
      )}
      {/*<pre>SELECTED: {JSON.stringify(getValues(), null, 2)}</pre>*/}
    </div>
  );
};

export default MyDropDown;
