import React from 'react';
import Head from 'next/head';
import Register from '../../../src/components/auth/Register/Register';
const index = () => {
  return (
    <div>
      <Head>
        <title>MenuGenerator</title>
      </Head>
      <Register />
    </div>
  );
};

export default index;
