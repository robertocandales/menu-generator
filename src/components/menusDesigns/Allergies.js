import React from 'react';
import { useRouter } from 'next/router';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
//import CloseIcon from "@material-ui/icons/CLose";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  innerRoot: {
    maxWidth: 450,
    width: '100%',
    minWidth: 330,
    textAlign: 'center',
    height: '100vh',
  },
  logoDiv: {
    backgroundColor: 'black',
    width: '100%',
    padding: 10,
  },
  backButton: {
    backgroundColor: '#ffae04',
    color: 'white',
    borderRadius: 100,
    width: 280,
    textTransform: 'capitalize',
    padding: 12,
  },
}));

const Allergies = () => {
  const classes = useStyles();
  const router = useRouter();

  const renderSmartLogo = () => {
    return (
      <Grid item xs>
        <div className={classes.logoDiv}>
          <img src='/assets/images/logo_smart.png' />
        </div>
      </Grid>
    );
  };

  const renderTopSection = () => {
    return (
      <Grid item xs style={{ padding: 30, textAlign: 'left' }}>
        {/*<IconButton
          size="small"
          onClick={() => router.back()}
          style={{ color: "orange", marginBottom: 25 }}
        >
          <CloseIcon />
          <Typography variant="subtitle2">Close</Typography>
        </IconButton>*/}
        <Typography variant='body2' style={{ fontSize: 11 }}>
          Actualmente el Reglamento 1169/2011 del Parlamento Europeo, nos obliga a especificar en la
          carta de nuestra oferta gastronómica los alérgenos que tiene cada plato, específicamente
          14 alérgenos que vemos a continuación:
        </Typography>
      </Grid>
    );
  };

  const renderImages = () => {
    return (
      <Grid item xs style={{ padding: '0px 30px' }}>
        <img alt='allergies' src='/assets/images/allergies.png' width='100%' />
      </Grid>
    );
  };

  const renderDetails = () => {
    return (
      <Grid item xs style={{ padding: 30 }}>
        <Typography variant='subtitle1' align='left' style={{ fontSize: 10 }}>
          1. Cereales que contengan gluten, a saber: trigo, centeno, cebada, avena, espelta, kamut o
          sus variedades híbridas y productos derivados, salvo:
          <br />
          <br />
          Jarabes de glucosa a base de trigo, incluida la dextrosa.
          <br />
          Maltodextrinas a base de trigo.
          <br />
          Jarabes de glucosa a base de cebada.
          <br />
          Cereales utilizados para hacer destilados alcohólicos, incluido el alcohol etílico de
          origen agrícola.
          <br />
          <br />
          2. Crustáceos y productos a base de crustáceos.
          <br />
          <br />
          3. Huevos y productos a base de huevo.
          <br />
          <br />
          4. Pescado y productos a base de pescado, salvo:
          <br />
          <br />
          Gelatina de pescado utilizada como soporte de vitaminas o preparados de carotenoides.
          <br />
          Gelatina de pescado o ictiocola utilizada como clarificante en la cerveza y el vino.
          <br />
          <br />
          5. Cacahuetes y productos a base de cacahuetes.
          <br />
          <br />
          6. Soja y productos a base de soja, salvo:
          <br />
          <br />
          Aceite y grasa de semilla de soja totalmente refinados.
          <br />
          <br />
          Tocoferoles naturales mezclados (E306), d-alfa tocoferol natural, acetato de d-alfa
          tocoferol natural y succinato de d-alfa tocoferol natural derivados de la soja.
          <br />
          <br />
          Fitosteroles y ésteres de fitosterol derivados de aceites vegetales de soja.
          <br />
          <br />
          Ésteres de fitostanol derivados de fitosteroles de aceite de semilla de soja.
          <br />
          <br />
          7. Leche y sus derivados (incluida la lactosa), salvo:
          <br />
          <br />
          Lactosuero utilizado para hacer destilados alcohólicos, incluido el alcohol etílico de
          origen agrícola.
          <br />
          <br />
          8. Frutos de cáscara
          <br />
          <br />
          Es decir, almendras, avellanas, nueces, anacardos, pacanas, nueces de Brasil, alfóncigos,
          nueces macadamia o nueces de Australia y productos derivados, salvo los frutos de cáscara
          utilizados para hacer destilados alcohólicos, incluido el alcohol etílico de origen
          agrícola.
          <br />
          <br />
          9. Apio y productos derivados.
          <br />
          <br />
          10. Mostaza y productos derivados.
          <br />
          <br />
          11. Granos de sésamo y productos a base de granos de sésamo.
          <br />
          <br />
          12. Dióxido de azufre y sulfitos en concentraciones superiores a 10 mg/kg o 10 mg/litro en
          términos de SO2 total, para los productos listos para el consumo o reconstituidos conforme
          a las instrucciones del fabricante.
          <br />
          <br />
          13. Altramuces y productos a base de altramuces.
          <br />
          <br />
          14. Moluscos y productos a base de moluscos.
        </Typography>
      </Grid>
    );
  };

  const renderBackButton = () => {
    return (
      <Grid item xs style={{ padding: '0px 0px 30px 0px' }}>
        <Button onClick={() => router.back()} variant='contained' className={classes.backButton}>
          Go Back
        </Button>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.innerRoot}>
        <Grid container direction='column'>
          {renderSmartLogo()}
          {renderTopSection()}
          {renderImages()}
          {renderDetails()}
          {renderBackButton()}
        </Grid>
      </div>
    </div>
  );
};

export default Allergies;
