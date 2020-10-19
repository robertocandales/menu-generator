import React, { useState } from 'react';
import { Typography, Grid, Divider, Fab } from '@material-ui/core';
import DeleteButton from '../../../Global/DeleteButton/DeleteButton';
import CheckboxComponent from '../../../Global/CheckboxComponent/CheckboxComponent';
import AddIcon from '@material-ui/icons/Add';
import { COLORS } from '../../../../Utils/Colors/color';
import List from './List';
import DialogListProducts from './DialogListProducts';
import { DragableList } from './DragebleList/DragableList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ProductList = ({ setVisibleProducts, subCategories, visibleProducts }) => {
  return (
    <Grid container direction='column' justify='flex-start' alignItems='center' sm={12} item>
      <Grid item container direction='row' justify='center' alignItems='flex-start'>
        <Grid item sm={11}>
          <Typography variant='h6'>Products</Typography>
        </Grid>
      </Grid>

      <Grid item style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px' }} container>
        <DndProvider backend={HTML5Backend}>
          <DragableList
            setVisibleProducts={setVisibleProducts}
            subCategories={subCategories}
            visibleProducts={visibleProducts}
          />
        </DndProvider>
      </Grid>
    </Grid>
  );
};

export default ProductList;
