import React from 'react';
import Container from '../../src/components/Contaniner/Container';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AllDesignMenus from '../../src/components/menusDesigns/AllDesignMenus';
const MenuBuilder = () => {
  const router = useRouter();
  const { menus } = router.query;
  return (
    <div>
      <Head>
        <title>Smartavola</title>
        {/*<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />*/}
      </Head>
      <Container>
        <AllDesignMenus Menus={menus} />
      </Container>
    </div>
  );
};

export default MenuBuilder;
