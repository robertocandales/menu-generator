import React from 'react';
import { Grid, Paper, TextField } from '@material-ui/core';
import UploadButton from '../../UploadButton/UploadButton';
import { COLORS } from '../../../Utils/Colors/color';
import { makeStyles } from '@material-ui/core/styles';
import { handleUpload } from '../../../hooks/storageImage';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  bigIcon: {
    width: 40,
    height: 'auto',
  },
}));

const MiddleForm = ({
  addDirection,
  setAddDirection,
  storeName,
  setStoreName,
  wifiName,
  setWifiName,
  wifiPass,
  setWifiPass,
  setPicture,
  picture,
}) => {
  const classes = useStyles();
  return (
    <Grid item container direction='row' justify='center' alignItems='stretch' spacing={2}>
      <Grid item sm={4} xs={4}>
        <Paper
          elevation={3}
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextField
            label='Add direction'
            variant='outlined'
            fullWidth
            rows={6}
            multiline
            style={{ padding: '10px' }}
            value={addDirection}
            onChange={(e) => setAddDirection(e.target.value)}
          />
        </Paper>
      </Grid>
      <Grid item sm={4} xs={4}>
        {' '}
        <Paper
          elevation={3}
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Grid
            item
            container
            direction='column'
            justify='space-around'
            alignItems='center'
            style={{ height: '100%', width: '100%' }}>
            <Grid item>
              <TextField
                label='Insert Store Name'
                fullWidth
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </Grid>
            <Grid item style={{ padding: '10px' }}>
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
                btnText={'add logo'}
                onChange={(pictures) => {
                  const file = pictures[0];

                  if (file.size > 5000000) {
                    alert('Image size very large, choose another image please, max size 5Mb');
                  } else if (file.type === 'image/png' || file.type === 'image/jpg') {
                    const res = handleUpload('menu', file, setPicture);
                  } else if (file.type !== 'image/png' || file.type !== 'image/jpg') {
                    alert('Image have to .png or JPG extension');
                  }
                }}
                icon={
                  <img
                    alt='thumbnail icon'
                    src={picture || '/assets/images/picIcon.png'}
                    className={`${classes.icon} ${classes.bigIcon}`}
                  />
                }
              />{' '}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item sm={4} xs={4} container>
        <Grid item sm={12} container>
          <Paper
            elevation={3}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '20px',
            }}>
            <div>Wifi</div>{' '}
            <TextField
              label='Wifi name'
              fullWidth
              value={wifiName}
              onChange={(e) => setWifiName(e.target.value)}
            />{' '}
            <TextField
              label='Password'
              fullWidth
              value={wifiPass}
              onChange={(e) => setWifiPass(e.target.value)}
            />
          </Paper>
        </Grid>{' '}
      </Grid>
    </Grid>
  );
};

export default MiddleForm;
