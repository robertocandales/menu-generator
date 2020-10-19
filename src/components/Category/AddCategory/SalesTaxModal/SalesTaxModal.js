import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { COLORS } from '../../../../Utils/Colors/color';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

import FormControl from '@material-ui/core/FormControl';

import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { store } from '../../../../context/store';
import { saveTax } from '../../../../firebase/db/tax';
import Notification from '../../../Global/Notification/Notification';

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
const SalesTaxModal = ({
  isVisible,
  setIsVisible,
  toggleAddSalesTaxDialog,
  data1,
  vales,
  setvales,
  edit,
  DBSalesTaxOptions,
  setDBSalesTaxOptions,
  //  setsalesTax,
  //  setporcentTax,
}) => {
  const globalState = useContext(store);

  const [errorEndpoint, setErrorEndpoint] = useState({
    message: '',
    isError: false,
    success: false,
  });
  const [open, setOpen] = useState(false);

  const { addOptionsTaxDispatch, addOptionsTax } = globalState;
  const [salesTax, setsalesTax] = useState('');
  const [porcentTax, setporcentTax] = useState('');
  const classes = useStyles();
  const [onchageSales, setonchageSales] = useState('');
  const [porcentValue, setporcentValue] = useState('');
  const addSalesTax = async (e) => {
    e.preventDefault();
    setsalesTax(onchageSales);
    setporcentTax(porcentValue);
    setIsVisible(!isVisible);

    const data = [...DBSalesTaxOptions];

    const taxOptionObj = {
      title: onchageSales,
      taxPercent: porcentValue,
    };
    try {
      const response = await saveTax(taxOptionObj);
      if (response) {
        data.push({
          ...taxOptionObj,
          ...response,
        });
        setDBSalesTaxOptions(data);
        const array = data.map((a) => {
          const pa = {
            value: a.taxPercent,
            label: `${a.title} (${a.taxPercent}%)`,
            id: a.id,
            title: a.title,
            taxPercent: a.taxPercent,
          };
          return pa;
        });
        setvales(array);
        setOpen(true);
        setErrorEndpoint({ message: 'Tax option added ', success: true });
        setonchageSales('');
        setporcentValue('');
        addOptionsTaxDispatch({
          type: 'ADD_TAX_OPTIONS',
          data,
        });
      }
    } catch (error) {
      console.log(error);
      setOpen(true);
      setErrorEndpoint({ message: 'Tax option error ', error: true });
    }
  };
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={isVisible}
        onClose={toggleAddSalesTaxDialog}
        aria-labelledby='max-width-dialog-title'>
        <DialogTitle id='max-width-dialog-title'>Add Sales Tax Option</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              name='saleTax'
              fullWidth
              label='Enter sales tax title'
              onChange={(e) => setonchageSales(e.target.value)}
            />
            <FormControl fullWidth className={classes.optionSelector}>
              <InputLabel htmlFor='standard-adornment-percent'>Enter sales tax percent</InputLabel>
              <Input
                name='salesPorcent'
                value={porcentValue}
                id='standard-adornment-percent'
                type='number'
                onChange={(e) => setporcentValue(e.target.value)}
                endAdornment={
                  <InputAdornment position='end' style={{ marginRight: 10 }}>
                    %
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions className={classes.optionSelector}>
          <Button
            onClick={() => {
              toggleAddSalesTaxDialog();
              //  resetDialogFields();
            }}
            color='primary'
            style={{ color: 'black' }}
            size='large'
            variant='outlined'>
            Close
          </Button>
          <Button
            onClick={(e) => addSalesTax(e)}
            color='primary'
            style={{ color: 'black' }}
            size='large'
            variant='contained'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Notification
        success={errorEndpoint.success}
        error={errorEndpoint.isError}
        message={errorEndpoint.message}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default SalesTaxModal;
