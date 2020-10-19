import React, { useState } from 'react';
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
import UploadButton from '../../../../UploadButton/UploadButton';

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

  itemInfoFieldsContainer: {
    padding: '10px',
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
  },
}));

const DigitalMenuDescription = () => {
  const classes = useStyles();
  const [picture, setPicture] = useState(null);

  return (
    <>
      <Grid item xs={12} md={4} lg={3}>
        {/* information for online store */}
        <Paper
          className={classes.itemInfoFieldsContainer}
          // style={{ height: 320, paddingLeft: 20, paddingRight: 20 }}
          elevation={3}>
          <TextField
            placeholder='digital-menu-description'
            fullWidth
            multiline
            rows={4}
            //  value={storeInformation}
            //  onChange={(e) => setStoreInformation(e.target.value)}
            variant='outlined'
          />
          {/*<div
            className={classes.container}
            style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}>
            {picture && (
              <img
                src={picture}
                alt={picture?.slice(0, 15)}
                style={{
                  width: 80,
                  height: 80,
                }}
              />
            )}
          </div>*/}
          <UploadButton
            buttonProps={{
              variant: 'contained',
              color: 'primary',
              component: 'span',
            }}
            rootProps={{
              style: { marginBottom: 0, textAlign: 'center' },
            }}
            btnText={'add-digital-menu-picture'}
            onChange={(pictures) => {
              const file = pictures[0];
              let reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onloadend = function () {
                setPicture(reader.result);
              };
            }}
          />
        </Paper>
      </Grid>
    </>
  );
};

export default DigitalMenuDescription;
