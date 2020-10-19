import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useRouter } from 'next/router';
import Head from 'next/head';
// import Link from "next/link";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { authenticateUser } from '../../../firebase/db/signup';
const Login = () => {
  const router = useRouter();
  return (
    <Container style={{ marginTop: '7%', maxWidth: 600 }}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Email is invalid').required('Email is required'),
          password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        })}
        onSubmit={async (fields) => {
          console.log(fields);

          try {
            const isSuccess = await authenticateUser(fields);
            console.log(isSuccess, 'isSuccess');
            if (isSuccess) {
              router.replace(`/categoryList`);
            } else {
              alert('Authentication failed');
            }
          } catch {
            alert('Service failed. Notify admin');
          }
        }}
        render={({ errors, status, touched }) => (
          <Form>
            <Paper elevation={4} style={{ padding: 40 }}>
              <Grid container spacing={2} direction='column' alignItems='center' justify='center'>
                <Grid item xs container style={{ padding: '15px 15px 25px 15px' }}>
                  <Grid
                    item
                    xs
                    style={{
                      backgroundColor: '#333333',
                      borderRadius: 5,
                      padding: 20,
                      width: '100%',
                      textAlign: 'center',
                    }}>
                    <img
                      alt='big-logo'
                      style={{
                        width: '50%',
                        height: 'auto',
                      }}
                      src={'/assets/images/logo.png'}
                    />
                  </Grid>
                </Grid>
                <Grid item xs container spacing={2}>
                  <Grid item xs>
                    <div className='form-group'>
                      <label htmlFor='confirmPassword' style={styles.formLabel}>
                        {/*{i18n.t('email')}*/} email
                      </label>
                      <Field
                        name='email'
                        type='email'
                        style={styles.formInput}
                        className={
                          'form-control' +
                          (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')
                        }
                      />
                      <ErrorMessage
                        name='confirmPassword'
                        component='div'
                        className='invalid-feedback'
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs container spacing={2}>
                  <Grid item xs>
                    <div className='form-group'>
                      <label htmlFor='confirmPassword' style={styles.formLabel}>
                        {/*{i18n.t('password')}*/} password
                      </label>
                      <Field
                        name='password'
                        type='password'
                        style={styles.formInput}
                        className={
                          'form-control' +
                          (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')
                        }
                      />
                      <ErrorMessage
                        name='confirmPassword'
                        component='div'
                        className='invalid-feedback'
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs container spacing={0} justify='center'>
                  <div className='form-group'>
                    <Button type='submit' style={styles.formButton}>
                      {/* {i18n.t("register")} */}Login
                    </Button>
                  </div>
                </Grid>
                <Grid item xs container spacing={0} justify='flex-start'>
                  <div className='form-group'>
                    <Button
                      type='button'
                      //onClick={handleChangeLanguage}
                    >
                      {/*{i18n.t('change-language')}*/} Choose language
                    </Button>
                  </div>
                </Grid>
                <Grid item xs>
                  <Typography variant='subtitle2'>
                    {/* {i18n.t("change-language")} */}Don't have an account?
                    <Button style={{ color: 'blue' }} onClick={() => router.push(`/auth/register`)}>
                      Sign up
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Form>
        )}
      />
    </Container>
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
    width: 455,
    fontSize: 17,
    color: 'white',
    backgroundColor: '#32cd32',
    borderRadius: 5,
    marginTop: 20,
  },
};
export default Login;
