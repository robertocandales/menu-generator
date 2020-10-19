import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';

import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import { COLORS } from '../../../Utils/Colors/color';

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
const SubCategoryItem = ({
  data1,
  register,
  edit = false,
  subCategoryList = [],
  setSsubCategoryList,
  setSubCategoryName,
  subCategoryName,
}) => {
  const classes = useStyles();
  //  const [subCategoryName, setSubCategoryName] = useState('');
  const [leading, setleading] = useState(true);
  const handleonKeyDown = (e) => {
    if (e.key === 'Enter' && subCategoryName !== '') {
      setSubCategoryName([]);
      e.preventDefault();

      setSsubCategoryList([
        ...subCategoryList,
        {
          id: subCategoryList.length + 1,
          title: subCategoryName,
        },
      ]);
    }
  };
  const onClickIcon = (element) => {
    setSsubCategoryList(subCategoryList.filter((removeElement) => removeElement !== element));
  };

  useEffect(() => {
    setleading(true);
    if (edit) {
      setSsubCategoryList(data1.subCategories);
      setleading(false);
    }
  }, [edit, data1]);
  return (
    <div>
      <TextField
        name='subcategory'
        value={subCategoryName}
        fullWidth
        label='Add Subcategory names'
        placeholder='And press enter'
        onChange={(e) => setSubCategoryName(e.target.value)}
        onKeyDown={(e) => handleonKeyDown(e)}
      />

      {subCategoryList.map((sub, i) => (
        <div className={classes.subCategory} key={i}>
          <div>{sub.title}</div>

          <IconButton onClick={() => onClickIcon(sub)} size='small'>
            <HighlightOffIcon fontSize='small' color='error' style={{ fontSize: 18 }} />
          </IconButton>
        </div>
      ))}
    </div>
  );
};

export default SubCategoryItem;
