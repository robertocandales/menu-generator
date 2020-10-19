import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MenuDetails from '../../../src/components/menusDesigns/MenuDetails/MenuDetails';
import Container from '../../../src/components/Contaniner/Container';

const Details = () => {
  const router = useRouter();
  const { details } = router.query;
  return (
    <div>
      <Head>
        <title>Smartavola</title>
        {/*<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />*/}
      </Head>
      <Container>
        <MenuDetails details={details} />
      </Container>
    </div>
  );
};

export default Details;
