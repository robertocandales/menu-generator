import React, { useState, useContext, useEffect } from 'react';
import MdPrint from 'react-ionicons/lib/MdPrint';
import MdRefresh from 'react-ionicons/lib/MdRefresh';
import MdNotifications from 'react-ionicons/lib/MdNotifications';
import Search from '@material-ui/icons/Search';
import MdSave from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { COLORS } from '../../../Utils/Colors/color';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import { addOrUpdateItem } from '../ItemField/ItemField';
import { useForm } from 'react-hook-form';
import { store } from '../../../context/store';
const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  container: {
    padding: theme.spacing(0),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  categoryImage: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  categoryTitle: {
    // marginLeft: theme.spacing(3),
    // position: 'absolute',
    fontWeight: 'bold',
  },
  itemInfoFieldsContainer: {
    padding: `${theme.spacing(6)}px ${theme.spacing(5)}px`,
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  categories: {
    cursor: 'pointer',
  },
  slider: {
    paddingLeft: theme.spacing(6),
  },
}));

const Header = () => {
  const globalState = useContext(store);
  const { itemResetDataDispatch } = globalState;

  const { handleSubmit } = useForm();
  const [resetDataForm, setSesetDataForm] = useState(false);
  const resetDataFormData = () => {
    itemResetDataDispatch({
      type: 'RESET_DATA',
      data: true,
    });
  };
  const classes = useStyles();
  const BUTTONS = [
    {
      title: 'Reset',
      icon: <MdRefresh className={classes.icon} />,
      onPress: () => resetDataFormData(),
      style: { backgroundColor: COLORS.WHITE },
    },

    {
      title: 'Print',
      icon: <MdPrint className={classes.icon} />,
      onPress: () => {
        print();
      },
      style: { backgroundColor: COLORS.WHITE },
    },
    {
      title: 'Save',
      icon: <MdSave className={classes.icon} />,
      onPress: () => handleSubmit(),
      style: { backgroundColor: COLORS.PRIMARY, color: 'black' },
    },
    {
      icon: <MdNotifications />,
      //  onPress: () => {},
      style: { backgroundColor: COLORS.SECONDARY, marginLeft: '2em', color: '#fff' },
    },
  ];
  return (
    <Grid container spacing={4} justify='space-between'>
      <Grid item xs={12} sm={6} lg={4}>
        <OutlinedInput
          className={classes.formControl}
          fullWidth
          type={'text'}
          placeholder='Search'
          //value={query}
          //onChange={(e) => handlerFilterSearchBar(e.target.value)}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='search query'
                //  onClick={handleQuery}
                //  onMouseDown={handleQuery}
                edge='end'>
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={8}>
        <Grid container spacing={3} justify='flex-end'>
          {BUTTONS.map((item, index) => (
            <Grid key={index.toString()} item>
              <Fab
                type={item.title === 'Save' ? 'submit' : null}
                form={item.title === 'Save' ? 'hook-form' : null}
                fullWidth
                variant='extended'
                style={item?.style || {}}
                onClick={() => item.onPress()}>
                {item.icon} {item?.title}
              </Fab>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
