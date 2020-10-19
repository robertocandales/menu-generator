import React from 'react';
import Head from 'next/head';

import Container from '../../src/components/Contaniner/Container';
import MenuScreen from '../../src/components/MenuScreen/MenuScreen';

const index = () => {
  return (
    <div>
      <Head>
        <title>Smartavola</title>
      </Head>
      <Container>
        {' '}
        <MenuScreen />{' '}
      </Container>
    </div>
  );
};

export default index;
