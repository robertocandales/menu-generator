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
import UploadButton from '../../../UploadButton/UploadButton';
import { COLORS } from '../../../../Utils/Colors/color';
import { Typography } from '@material-ui/core';

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

const DigitalMenuDescription = ({ picture, setPicture, menuDescription, setMenuDescription }) => {
  const classes = useStyles();

  return (
    <>
      {/* information for online store */}
      <Paper style={{ padding: '10px', height: 178, width: '100%' }} elevation={4}>
        <Grid item container justify='center' alignItems='center' direction='row' spacing={1}>
          <Grid item sm={8}>
            <TextField
              name='digitalMenuDescription'
              placeholder='digital-menu-description'
              fullWidth
              multiline
              rows={5}
              onChange={(e) => setMenuDescription(e.target.value)}
              value={menuDescription}
              variant='outlined'
            />
          </Grid>

          <Grid item sm={4}>
            <div
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
            </div>
            <div style={{ height: '100%', marginTop: '0px' }}>
              <UploadButton
                buttonProps={{
                  variant: 'contained',
                  component: 'span',

                  style: {
                    backgroundColor: COLORS.PRIMARY,
                    height: 40,
                    color: '#000',
                    marginTop: '-20px',
                  },
                }}
                rootProps={{}}
                btnText={
                  <div>
                    <Typography variant='caption'>add picture</Typography>
                  </div>
                }
                onChange={(pictures) => {
                  const file = pictures[0];
                  if (file.size > 500000) {
                    alert('Image size very large, choose another image please, max size 500kb');
                  } else {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = function () {
                      setPicture(reader.result);
                    };
                  }

                  //  let reader = new FileReader();
                  //  reader.readAsDataURL(file);
                  //  reader.onloadend = function () {
                  //    setPicture(reader.result);
                  //  };
                }}
                //icon={
                //  <img
                //    alt='thumbnail icon'
                //    src={picture || '/assets/images/picIcon.png'}
                //    className={`${classes.icon} ${classes.bigIcon}`}
                //  />
                //}
              />{' '}
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default DigitalMenuDescription;
