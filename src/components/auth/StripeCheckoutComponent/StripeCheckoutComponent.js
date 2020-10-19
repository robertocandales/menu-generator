import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutComponent = () => {
  const onToken = (token) => {
    localStorage.setItem('stripeToken', token);
  };

  return (
    <StripeCheckout
      token={onToken}
      label='subscribe-with-card'
      stripeKey='pk_test_51HE1sLAK7hAYfN3NrxWwWrLxPCiQDbWRmEOBpERXrmv59B8Npx38JHaTummEK2a0V9iDlbQWtuvnqbnlZkfMMiYx00IdESVg0f'
    />
  );
};

export default StripeCheckoutComponent;
