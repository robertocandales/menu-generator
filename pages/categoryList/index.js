import React from 'react';
import Container from '../../src/components/Contaniner/Container';
import Head from 'next/head';
import Item from '../../src/components/Item/Item';

const MenuBuilder = () => {
  return (
    <div>
      <Head>
        <title>Smartavola</title>
        {/*<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />*/}
      </Head>
      <Container>
        {' '}
        <Item />{' '}
      </Container>
    </div>
  );
};

export default MenuBuilder;
