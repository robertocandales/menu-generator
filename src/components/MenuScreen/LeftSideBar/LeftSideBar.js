import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import { COLORS } from '../../../Utils/Colors/color';

const useStyles = makeStyles((theme) => ({
  templateCard: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  templateImg: {
    width: '100%',
    height: 250,
    cursor: 'pointer',
    objectFit: 'contain',
    borderRadius: 5,
  },
}));

const LeftSideBar = ({ DBTemplates, setSelectedTemplateId, selectedTemplateId }) => {
  const classes = useStyles();
  return (
    <Paper
      elevation={3}
      style={{ height: '100%', padding: '10px', maxHeight: '88vh', overflowY: 'auto' }}>
      <Grid item xs={12} container direction='row' justify='center' alignItems='center' spacing={2}>
        <Grid item xs={12}>
          Select Design
        </Grid>
        <Grid item xs={12}>
          {DBTemplates.map((item) => (
            <Grid
              key={item.id}
              style={{
                backgroundColor: item.id === selectedTemplateId && COLORS.PRIMARY,
                marginTop: '2px',
                marginBottom: '2px',
              }}>
              <img
                src={item.image}
                alt={'t-' + item.id}
                className={classes.templateImg}
                onClick={() => setSelectedTemplateId(item.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>{' '}
    </Paper>
  );
};

export default LeftSideBar;
