import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import StripeCheckoutComponent from '../../StripeCheckoutComponent/StripeCheckoutComponent';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const RigthForm = ({
  Field,
  errors,
  ErrorMessage,
  isSaving,
  handleSubmit,
  setSubmitted,
  touched,
}) => {
  return (
    <>
      <Grid item xs>
        <Grid container spacing={2} direction='column' alignItems='center' justify='center'>
          <Grid item xs container spacing={2}>
            <Grid item xs>
              <div className='form-group'>
                <label htmlFor='email' style={styles.formLabel}>
                  'email
                </label>
                <Field
                  name='email'
                  type='email'
                  style={styles.formInput}
                  className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                />
                <ErrorMessage name='email' component='div' className='invalid-feedback' />
              </div>
            </Grid>
          </Grid>
          <Grid item xs container spacing={2}>
            <Grid item xs>
              <div className='form-group'>
                <label htmlFor='userName' style={styles.formLabel}>
                  user-name
                </label>
                <Field
                  name='userName'
                  type='text'
                  style={styles.formInput}
                  className={
                    'form-control' + (errors.userName && touched.userName ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage name='userName' component='div' className='invalid-feedback' />
              </div>
            </Grid>
          </Grid>
          <Grid item xs container spacing={2}>
            <Grid item xs>
              <div className='form-group'>
                <label htmlFor='password' style={styles.formLabel}>
                  choose-password
                </label>
                <Field
                  name='password'
                  type='password'
                  style={styles.formInput}
                  className={
                    'form-control' + (errors.password && touched.password ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage name='password' component='div' className='invalid-feedback' />
              </div>
            </Grid>
          </Grid>
          <Grid item xs container spacing={2}>
            <Grid item xs>
              <div className='form-group'>
                <label htmlFor='confirmPassword' style={styles.formLabel}>
                  confirm-password
                </label>
                <Field
                  name='confirmPassword'
                  type='password'
                  style={styles.formInput}
                  className={
                    'form-control' +
                    (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage name='confirmPassword' component='div' className='invalid-feedback' />
              </div>
            </Grid>
          </Grid>
          <Grid item xs container spacing={0} justify='flex-start'>
            <div className='form-group'>
              <Button disabled>
                {' '}
                <StripeCheckoutComponent />
              </Button>
            </div>
          </Grid>
          <Grid item xs container spacing={0} justify='flex-start'>
            <div className='form-group'>
              <Button
                type='button'
                disabled={isSaving}
                style={styles.formButton}
                onClick={(e) => {
                  setSubmitted(true);
                  handleSubmit();
                }}>
                register
              </Button>
            </div>
          </Grid>
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
export default RigthForm;
