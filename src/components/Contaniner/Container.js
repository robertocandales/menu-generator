import React from 'react';
import DrawerNavigation from '../DrawerNavigation/DrawerNavigation';
import Head from 'next/head';
import clsx from 'clsx';
import NavBar1 from '../NavBar/NavBar1';

const Container = ({ children }) => {
  return (
    <div>
      <Head>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
        <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
      </Head>

      <NavBar1 />
      <div style={{ padding: '10px', width: '100%' }}>{children}</div>
    </div>
  );
};

export default Container;
