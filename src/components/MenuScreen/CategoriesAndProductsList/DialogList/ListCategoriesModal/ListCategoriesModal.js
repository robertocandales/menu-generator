import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import _ from 'lodash';
import { Paper, Grid, Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));
export const Schema = Yup.object().shape({
  item_ids: Yup.array()
    .transform((ids) => {
      return ids.filter((id) => {
        return id === 0 || id;
      });
    })
    .min(1, 'Select at least one'),
});
const ListCategoriesModal = ({ categories, setCategoriesSelected }) => {
  const defaultNames = [];

  const { control, handleSubmit, errors, getValues } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: { item_ids: defaultNames },
  });

  const [checkedValues, setCheckedValues] = useState(defaultNames);
  function handleSelect(checkedId, category, index) {
    const newIds = checkedValues?.includes(checkedId)
      ? checkedValues?.filter((name) => name !== checkedId)
      : [...(checkedValues ?? []), checkedId];
    setCheckedValues(newIds);
    return newIds;
  }
  React.useEffect(() => {
    const result = _.intersectionWith(categories, checkedValues, (o, num) => o.id == num);
    setCategoriesSelected(result);
  }, [checkedValues]);

  return (
    <form onSubmit={handleSubmit((data) => console.log('DATA --->', data))}>
      <FormControl error={!!errors.item_ids?.message}>
        <FormHelperText>{errors.item_ids?.message}</FormHelperText>
        <Controller
          name='categories_selected'
          render={(props) =>
            categories.map((item, index) => (
              <Grid key={index} container style={{ marginTop: '5px', marginBottom: '5px' }}>
                {' '}
                <Paper
                  elevation={3}
                  style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '350px',
                  }}>
                  {' '}
                  <Grid container direction='row' justify='space-between' alignItems='center'>
                    <Grid item sm={9} style={{ marginLeft: '5px' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={() => props.onChange(handleSelect(item.id, item, index))}
                            checked={checkedValues.includes(item.id)}
                          />
                        }
                        //labelPlacement='start'
                        label={item.title}
                      />{' '}
                    </Grid>{' '}
                    <Grid item sm={2}>
                      <Avatar alt='Remy Sharp' src={item.image} />{' '}
                    </Grid>
                  </Grid>
                </Paper>{' '}
              </Grid>
            ))
          }
          control={control}
        />
      </FormControl>
      {/*<pre>SELECTED: {JSON.stringify(getValues(), null, 2)}</pre>
      <button>Submit</button>*/}
    </form>
  );
};

export default ListCategoriesModal;
