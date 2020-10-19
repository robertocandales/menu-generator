import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: '#fff',
    borderRadius: 100,
  },
}));

const FormFields = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleChange1 = (event) => {
    setAge(event.target.value);
  };
  const [age, setAge] = React.useState('');

  return (
    <div>
      <Paper style={{ padding: '20px' }}>
        <Grid container direction='column' justify='center' alignItems='stretch'>
          {' '}
          <Grid>
            <FormControl fullWidth>
              <TextField label='Name' fullWidth />
            </FormControl>
          </Grid>
          <Grid container direction='row' justify='space-between' alignItems='center'>
            <FormGroup row>
              <FormControl>
                <TextField label='Price' />{' '}
              </FormControl>{' '}
              <FormControl>
                <TextField label='Take away price' />{' '}
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox checked={state.checkedA} onChange={handleChange} name='digitalMenu' />
                }
                label='Visible on Digital Menu'
              />
              <FormControlLabel
                control={
                  <Checkbox checked={state.checkedv} onChange={handleChange} name='takeAway' />
                }
                label='Visible on Take Away'
              />
            </FormGroup>
          </Grid>
          <Grid container direction='row' justify='space-between' alignItems='center'>
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
            </FormControl>
            <FormControl style={{ minWidth: '200px' }}>
              <InputLabel id='demo-simple-select-label'>Select Sub-Category</InputLabel>
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
              <InputLabel id='demo-simple-select-label'>Select Avaliable Location</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={age}
                onChange={handleChange1}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default FormFields;
