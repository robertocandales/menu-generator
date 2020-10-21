import React from 'react';
import Head from 'next/head';
import Login from '../../../src/components/auth/Login/Login';
const index = () => {
  return (
    <div>
      <Head>
        <title>MenuGenerator</title>
      </Head>
      <Login />
    </div>
  );
};

export default index;
