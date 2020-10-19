import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormFields from './Form/FormFields';
import withStyles from '@material-ui/core/styles/withStyles';
import DigitalMenuDescription from './Form/DigitalMenuDescription';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
const ItemField = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          <Typography className={classes.heading}>Item Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction='row' justify='space-around' alignItems='stretch'>
            <FormFields />
            <DigitalMenuDescription />
          </Grid>{' '}
          {/*<Typography></Typography>*/}
          <div></div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ItemField;
