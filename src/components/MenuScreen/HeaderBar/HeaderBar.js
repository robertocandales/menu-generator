import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import SwitchComponent from '../../Global/SwitchComponent/SwitchComponent';
import SaveButton from '../../Global/SaveButton/SaveButton';
const HeaderBar = ({
  productWithPicture,
  setproductWithPicture,
  callWaiterButton,
  setCallWaiterButton,
  askForBillButton,
  setAskForBillButton,
  promoAsFirstPage,
  setpromoAsFirstPage,
  handleSubmit,
}) => {
  return (
    <React.Fragment>
      <Grid item>
        <SwitchComponent
          label={'Product with picture'}
          getValue={setproductWithPicture}
          value={productWithPicture}
        />
      </Grid>
      <Grid item>
        <SwitchComponent
          label={'Call Waiter Button'}
          getValue={setCallWaiterButton}
          value={callWaiterButton}
        />{' '}
      </Grid>
      <Grid item>
        <SwitchComponent
          label={'Ask for Bill Button'}
          getValue={setAskForBillButton}
          value={askForBillButton}
        />{' '}
      </Grid>
      <Grid item>
        <SwitchComponent
          label={'Promo as first page'}
          getValue={setpromoAsFirstPage}
          value={promoAsFirstPage}
        />{' '}
      </Grid>
      <Grid item>
        <SaveButton handleSubmit={handleSubmit} />
      </Grid>{' '}
    </React.Fragment>
  );
};

export default HeaderBar;
