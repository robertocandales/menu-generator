import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IosAddCircleOutline from 'react-ionicons/lib/IosAddCircleOutline';
import Typography from '@material-ui/core/Typography';
import { handleUpload } from '../../hooks/storageImage';

const useStyles = makeStyles(() => ({
  input: {
    display: 'none',
  },
  button: {
    color: '#fff',
    borderRadius: 100,
  },
  icon: {
    fontWeight: 'bold',
  },
}));

export default function UploadButton(props) {
  const classes = useStyles();
  const {
    onChange,
    btnText,
    multiple,
    buttonProps,
    rootProps,
    icon,
    id = 1,
    register,
    errors,
    data1,
    edit,
  } = props;
  return (
    <div {...rootProps}>
      <input
        required
        multiple={Boolean(multiple)}
        type='file'
        accept='image/*'
        className={classes.input}
        id={'contained-button-file' + id}
        onChange={(e) => onChange(e.target.files)}
      />

      <label htmlFor={'contained-button-file' + id}>
        <Button {...buttonProps} size='large' className={classes.button}>
          {icon ? (
            icon
          ) : (
            <IosAddCircleOutline
              color='black'
              fontSize={'15'}
              style={{ fontWeight: 'bold', marginRight: 10, color: 'black' }}
            />
          )}
          {btnText}
        </Button>
      </label>
    </div>
  );
}

UploadButton.defaultProps = {
  multiple: false,
};
