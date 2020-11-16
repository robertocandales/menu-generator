import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/Utils/theme/theme';
import { StateProvider } from '../src/context/store';
import 'react-data-grid/dist/react-data-grid.css';
import I18n from '../src/i18n/i18n';
import { useRouter } from 'next/router';

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter();
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    console.log(router.pathname.indexOf('login'));
    console.log(router.pathname.indexOf('menus'));
    if (
      !localStorage.getItem('user') &&
      router.pathname.indexOf('auth') === -1 &&
      router.pathname.indexOf('menus') === -1
    ) {
      router.push('/auth/login');
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, height=device-height'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <I18n lngDict={pageProps.lngDict} locale={pageProps.lng}>
          {/*<Suspense fallback={<div>Loading...</div>}>*/}
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <StateProvider>
            <Component {...pageProps} />
          </StateProvider>
          {/*</Suspense>*/}
        </I18n>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
