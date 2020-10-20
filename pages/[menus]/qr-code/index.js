import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MenuDetails from '../../../src/components/menusDesigns/MenuDetails/MenuDetails';
import Container from '../../../src/components/Contaniner/Container';
import QRcodePrint from '../../../src/components/Global/QrCode/QRcodePrint';

const QrCode = () => {
  return (
    <div>
      <Head>
        <title>MenuGenerator</title>
      </Head>
      <Container>
        <QRcodePrint />
      </Container>
    </div>
  );
};

export default QrCode;
