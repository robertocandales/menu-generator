import React from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import UploadButton from '../../UploadButton/UploadButton';
import SwitchComponent from '../../Global/SwitchComponent/SwitchComponent';
import HourZone from '../HourZone/HourZone';
import { COLORS } from '../../../Utils/Colors/color';
import QrCode from '../../Global/QrCode/QrCode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRouter } from 'next/router';

const RightSideBar = ({
  facebook,
  setFacebook,
  instagram,
  setInstagram,
  twitter,
  setTwitter,
  whatsapp,
  setWhatsapp,
  enableWhatsappOrders,
  setEnableWhatsappOrders,
  TimePickers,
  weekdaysFromTo,
  setWeekdaysFromTo,
  TEMPLATES,
  selectedTemplateId,
}) => {
  const router = useRouter();

  const saveQR = () => {
    const input = document.getElementById('divToPrint');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
      pdf.save('smartavolaQR.pdf');
    });
  };
  return (
    <Grid
      item
      sm={12}
      container
      direction='column'
      justify='space-between'
      alignItems='stretch'
      spacing={2}>
      <Grid sm={12} item>
        <Paper
          elevation={3}
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '20px',
          }}>
          {' '}
          <TextField
            label='Facebook'
            fullWidth
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
          <TextField
            label='Instagram'
            fullWidth
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
          <TextField
            label='Twitter'
            fullWidth
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
          <TextField
            label='WhatsApp'
            fullWidth
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
          <SwitchComponent
            label='Enable Whatsapp Orders'
            getValue={setEnableWhatsappOrders}
            value={enableWhatsappOrders}
          />
        </Paper>
      </Grid>
      <Grid sm={12} item>
        <Paper
          elevation={3}
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Grid item sm={12} container>
            <Paper elevation={3}>
              <HourZone
                TimePickers={TimePickers}
                weekdaysFromTo={weekdaysFromTo}
                setWeekdaysFromTo={setWeekdaysFromTo}
              />
            </Paper>
          </Grid>{' '}
        </Paper>{' '}
      </Grid>
      <Grid sm={12} item id='divToPrint' style={{ height: '100%', width: '100%' }}>
        <Paper
          elevation={3}
          style={{
            height: '219px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
            style={{ height: '100%' }}>
            <Grid item sm={12}>
              <QrCode />
            </Grid>
            <Grid container direction='row' justify='space-around' alignItems='center' item sm={12}>
              <Grid item style={{ textAlign: 'center' }} sm={6}>
                <Button
                  type='submit'
                  style={styles.formButton}
                  //  onClick={() => router.push('categoryList/qr-code')}
                  onClick={() =>
                    router.push({
                      pathname: `categoryList/qr-code`,
                      query: {
                        url: TEMPLATES[selectedTemplateId].name,
                        user: localStorage.getItem('user'),
                      },
                    })
                  }>
                  Generate QR code
                </Button>
              </Grid>
              <Grid item style={{ textAlign: 'center' }} sm={6}>
                {/*<Button
                  type='submit'
                  style={styles.formButton}
                  onClick={() => router.push(TEMPLATES[selectedTemplateId].name)}>
                  Generate links
                </Button>*/}
                <Button
                  type='submit'
                  style={styles.formButton}
                  onClick={() =>
                    router.push(
                      {
                        pathname: TEMPLATES[selectedTemplateId].name,
                        query: JSON.parse(localStorage.getItem('user')),
                      },
                      undefined,
                      { shallow: true },
                    )
                  }>
                  Generate links
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>{' '}
      </Grid>
    </Grid>
  );
};
const styles = {
  formButton: {
    padding: 10,
    fontSize: 10,
    color: 'black',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 100,
    borderTopLeftRadius: 100,
    marginTop: 0,
    marginButtom: 0,
    width: '70%',
  },
};

export default RightSideBar;
