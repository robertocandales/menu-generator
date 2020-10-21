import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import UploadButton from '../../UploadButton/UploadButton';
import { makeStyles } from '@material-ui/core/styles';
import { COLORS } from '../../../Utils/Colors/color';
import Fab from '@material-ui/core/Fab';
import ModalComponent from '../../Global/ModalComponent/ModalComponent';
import ResetButton from '../../Global/ResetButton/ResetButton';
import { handleUpload } from '../../../hooks/storageImage';
import Button from '@material-ui/core/Button';

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

const ImageAndSaveButton = ({
  setThumbnail,
  thumbnail,
  edit,
  seteditCategory,
  setAddCategoryData,
  addCategoryData,
  resetData,
}) => {
  const [open1, setOpen1] = React.useState(false);

  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen1(true);
  };
  const message =
    'ANTES DE BORRAR ESTA CATEGORIA REASIGNE A OTRA CATEGORIA LOS PRODUCTOS QUE LA INTEGRAN';
  return (
    <div>
      <Grid container direction='row' alignItems='center' justify='space-around' spacing={2}>
        <Grid item sm={edit ? 6 : 6} xs={12}>
          <UploadButton
            edit={edit}
            buttonProps={{
              variant: 'contained',
              component: 'span',
              style: {
                backgroundColor: COLORS.SECONDARY,
                height: 60,
                color: '#000',
                width: '100%',
              },
            }}
            rootProps={{}}
            btnText={edit ? 'Picture' : 'Add Picture'}
            onChange={(pictures) => {
              const file = pictures[0];

              if (file.size > 5000000) {
                alert('Image size very large, choose another image please, max size 5Mb');
              } else if (file.type === 'image/png' || file.type === 'image/jpg') {
                const res = handleUpload('categories', file, setThumbnail);
              } else if (file.type !== 'image/png' || file.type !== 'image/jpg') {
                alert('Image have to .png or JPG extension');
              }
            }}
            icon={
              <img
                alt='thumbnail icon'
                src={thumbnail || '/assets/images/picIcon.png'}
                className={`${classes.icon} ${classes.bigIcon}`}
              />
            }
          />
        </Grid>
        <Grid item sm={edit ? 2 : 2}>
          {/*<Fab
            color='primary'
            variant='round'
            style={{
              textAlign: 'center',
              padding: '2em',
              width: '100%',
              borderRadius: 100,
            }}
            //onClick={sendData}
            type='submit'>
            save
          </Fab>*/}
          <Button color='primary' variant='contained' type='submit'>
            Save
          </Button>
        </Grid>{' '}
        {edit ? (
          <Grid item sm={edit ? 2 : 2}>
            <Button color='secondary' variant='contained' onClick={handleClickOpen}>
              Delete
            </Button>
          </Grid>
        ) : null}
        <Grid item sm={edit ? 2 : 2}>
          <ResetButton resetData={resetData} />
        </Grid>
      </Grid>
      <ModalComponent
        open1={open1}
        setOpen1={setOpen1}
        message={message}
        seteditCategory={seteditCategory}
        setAddCategoryData={setAddCategoryData}
        addCategoryData={addCategoryData}
        resetData={resetData}
      />
    </div>
  );
};

export default ImageAndSaveButton;
