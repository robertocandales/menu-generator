import React from 'react';
import { fade, Fab } from '@material-ui/core';
import NavigationIcon from '@material-ui/icons/Navigation';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';

import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import { COLORS } from '../../../../Utils/Colors/color';
import DataGridModal from '../DataGridModal/DataGridModal';
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const HeaderBar = () => {
  const classes = useStyles();
  const [openDataGrid, setOpenDataGrid] = React.useState(false);

  const dataGridOpen = () => {
    setOpenDataGrid(!openDataGrid);
  };
  const [age, setAge] = React.useState('');
  const handleChange1 = (event) => {
    setAge(event.target.value);
  };
  return (
    <div style={{ width: '100%' }}>
      <Grid container sm={6} md={6} direction='row' justify='flex-start' alignItems='center' item>
        {/*<Grid container sm={6} md={6} justify='space-around' direction='row' alignItems='center'>*/}
        <Fab
          onClick={() => dataGridOpen()}
          variant='extended'
          size='small'
          style={{
            boxShadow: '1px 1px 3px grey',
            marginTop: 8,
            backgroundColor: COLORS.WHITE,
          }}>
          <NavigationIcon />
          MASSIVE EDITION
        </Fab>{' '}
        {/*<FormControl style={{ minWidth: '200px' }}>
            <InputLabel id='demo-simple-select-label'>Select Category</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={age}
              onChange={handleChange1}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>{' '}
          </FormControl>
          <FormControl style={{ minWidth: '200px' }}>
            <InputLabel id='demo-simple-select-label'>Select Category</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={age}
              onChange={handleChange1}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>{' '}
          </FormControl>*/}
        {/*</Grid>*/}
      </Grid>
      <DataGridModal
        openDataGrid={openDataGrid}
        setOpenDataGrid={setOpenDataGrid}
        dataGridOpen={dataGridOpen}
      />
    </div>
  );
};

export default HeaderBar;
