import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const LeftForm = ({ Field, errors, ErrorMessage, touched }) => {
  return (
    <>
      <Grid item xs container spacing={2}>
        <Grid item xs>
          <div className='form-group'>
            <label htmlFor='email' style={styles.formLabel}>
              business-name
            </label>
            <Field
              name='bussinessName'
              type='text'
              style={styles.formInput}
              className={
                'formInput' +
                'form-control' +
                (errors.bussinessName && touched.bussinessName ? ' is-invalid' : '')
              }
            />
            <ErrorMessage name='bussinessName' component='div' className='invalid-feedback' />
          </div>
        </Grid>
        <Grid item xs>
          <div className='form-group'>
            <label htmlFor='email' style={styles.formLabel}>
              country
            </label>
            <Field as='select' name='country' style={styles.formInput}>
              <option value='ar'>Argentina</option>
              <option value='bd'>Bangladesh</option>
              <option value='pk'>Pakistan</option>
            </Field>
            {/* <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback"
                            /> */}
          </div>
        </Grid>
      </Grid>
      <Grid item xs container spacing={2}>
        <Grid item xs>
          <div className='form-group'>
            <label htmlFor='bussinessAddress' style={styles.formLabel}>
              business-address
            </label>
            <Field
              name='bussinessAddress'
              type='text'
              style={styles.formInput}
              className={
                'form-control' +
                (errors.bussinessAddress && touched.bussinessAddress ? ' is-invalid' : '')
              }
            />
            <ErrorMessage name='bussinessAddress' component='div' className='invalid-feedback' />
          </div>
        </Grid>
      </Grid>
      <Grid item xs container spacing={2}>
        <Grid item xs>
          <div className='form-group'>
            <label htmlFor='city' style={styles.formLabel}>
              city
            </label>
            <Field
              name='city'
              type='text'
              style={styles.formInput}
              className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')}
            />
            <ErrorMessage name='city' component='div' className='invalid-feedback' />
          </div>
        </Grid>
        <Grid item xs>
          <div className='form-group'>
            <label htmlFor='state' style={styles.formLabel}>
              state
            </label>
            <Field
              name='state'
              type='text'
              style={styles.formInput}
              className={'form-control' + (errors.state && touched.state ? ' is-invalid' : '')}
            />
            <ErrorMessage name='state' component='div' className='invalid-feedback' />
          </div>
        </Grid>
      </Grid>
      <Grid item xs container spacing={2}>
        <Grid item xs>
          <div className='form-group'>
            <label htmlFor='zip' style={styles.formLabel}>
              zip
            </label>
            <Field
              name='zip'
              type='number'
              style={styles.formInput}
              className={'form-control' + (errors.zip && touched.zip ? ' is-invalid' : '')}
            />
            <ErrorMessage name='zip' component='div' className='invalid-feedback' />
          </div>
        </Grid>
        <Grid item xs>
          <div className='form-group'>
            <label htmlFor='tel' style={styles.formLabel}>
              tel
            </label>
            <Field
              name='tel'
              type='text'
              style={styles.formInput}
              className={'form-control' + (errors.tel && touched.tel ? ' is-invalid' : '')}
            />
            <ErrorMessage name='tel' component='div' className='invalid-feedback' />
          </div>
        </Grid>
      </Grid>
      <Grid item xs container spacing={2}>
        <Grid item xs>
          <div className='form-group'>
            <label htmlFor='adminName' style={styles.formLabel}>
              admin-name
            </label>
            <Field
              name='adminName'
              type='text'
              style={styles.formInput}
              className={
                'form-control' + (errors.adminName && touched.adminName ? ' is-invalid' : '')
              }
            />
            <ErrorMessage name='adminName' component='div' className='invalid-feedback' />
          </div>
        </Grid>
        <Grid item xs>
          <div className='form-group'>
            <label htmlFor='lastName' style={styles.formLabel}>
              last-name
            </label>
            <Field
              name='lastName'
              type='text'
              style={styles.formInput}
              className={
                'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')
              }
            />
            <ErrorMessage name='lastName' component='div' className='invalid-feedback' />
          </div>
        </Grid>
      </Grid>
    </>
  );
};
const styles = {
  formInput: {
    borderRadius: 4,
    border: '1px solid silver',
    fontSize: 16,
    padding: 15,
    width: '100%',
  },
  formLabel: {
    textTransform: 'uppercase',
    fontWeight: 500,
    marginBottom: 3,
    display: 'block',
  },
  formButton: {
    padding: 10,
    width: 300,
    fontSize: 17,
    color: 'white',
    backgroundColor: '#32cd32',
    borderRadius: 5,
  },
};
export default LeftForm;
