import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { useRouter } from 'next/router';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Grid } from '@material-ui/core';

const QrCode = () => {
  const [uid, setUid] = useState(null);
  useEffect(() => {
    var getUrl = window.location;
    var baseUrl = getUrl.protocol + '//' + getUrl.host + '/';
  }, []);
  return (
    <>
      <Grid container direction='row' justify='center' alignItems='center'>
        <QRCode value='http://facebook.github.io/react/' size={100} fgColor='#333333' />
      </Grid>
    </>
  );
};

export default QrCode;
