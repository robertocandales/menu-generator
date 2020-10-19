import React, { useEffect, useState, useContext } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { store } from '../../../context/store';

export const saveQR = () => {
  const input = document.getElementById('divToPrint');
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', [210, 297]);
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('smartavolaQR.pdf');
  });
};

const QRcodePrint = () => {
  const globalState = useContext(store);
  const { QRcodeURLState } = globalState;

  const router = useRouter();
  const { query } = router;

  const [uid, setUid] = useState(null);
  const [baseURL, setBaseURL] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let getUrl = window.location;
    let baseUrl = getUrl.protocol + '//' + getUrl.host + '/';
    setBaseURL(baseUrl);

    setBaseURL(localStorage.getItem('url'));

    setLoading(false);
  }, []);
  return (
    <>
      <Container style={{ marginTop: '7%', maxWidth: 400 }}>
        <Paper elevation={4}>
          <Grid container direction='column' alignItems='center' justify='center'>
            <Grid container direction='column' alignItems='center' justify='center' id='divToPrint'>
              <Grid
                item
                xs
                style={{
                  backgroundColor: '#333333',
                  borderRadius: 5,
                  padding: 20,
                  width: '100%',
                  textAlign: 'center',
                  margin: '0px 0px 25px 0px',
                }}>
                <img
                  alt='big-logo'
                  style={{
                    width: '80%',
                    height: 'auto',
                  }}
                  src={'/assets/images/logo.png'}
                />
              </Grid>{' '}
              {!loading && (
                <Grid item xs>
                  <QRCode value={baseURL} size={270} fgColor='#333333' />
                </Grid>
              )}
              <Grid item xs container style={{ padding: 20 }}>
                <Typography variant='body1'>
                  1- Open camera
                  <br />
                  2- Scan QR
                  <br />
                  3- Enjoy Menu
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs style={{ width: '100%' }}>
              <Button
                type='submit'
                fullWidth={true}
                style={styles.formButton}
                onClick={() => saveQR()}>
                Save QR
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
const styles = {
  formButton: {
    padding: 10,
    fontSize: 17,
    color: 'white',
    backgroundColor: '#32cd32',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    marginTop: 20,
  },
};
export default QRcodePrint;
