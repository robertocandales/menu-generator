import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { useState, useEffect, useRef, useContext } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import LeftForm from './LeftForm/LeftForm';
import RigthForm from './RigthForm/RigthForm';
import { saveUser } from '../../../firebase/db/signup';

const Register = () => {
  const router = useRouter();
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  return (
    <div>
      <Container style={{ marginTop: '7%' }}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
            bussinessName: '',
            bussinessAddress: '',
            city: '',
            state: '',
            zip: '',
            tel: '',
            adminName: '',
            lastName: '',
            userName: '',
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Email is invalid').required('Email is required'),
            password: Yup.string()
              .min(8, 'Password must be at least 8 characters')
              .required('Password is required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('Confirm Password is required'),
            bussinessName: Yup.string().required('Bussiness Name is required'),
            bussinessAddress: Yup.string().required('Bussiness Address is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            zip: Yup.number().required('Zip is required'),
            tel: Yup.string()
              .matches(
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                'Telephone number is invalid',
              )
              .required('Telephone Number is required'),
            adminName: Yup.string().required('Admin Name is required'),
            userName: Yup.string().required('User Name is required'),
          })}
          onSubmit={async (fields) => {
            const token = localStorage.getItem('stripeToken');

            console.log('here ', isSubmitted);
            if (!isSubmitted) {
              return;
            }

            setIsSaving(true);
            try {
              await saveUser(fields, token || '');
              router.push(`/auth/login`);
            } catch (e) {
              setIsSaving(false);
              alert('Services are not available. Please email admin');
            }
          }}
          render={({ errors, status, touched, handleSubmit }) => (
            <Form>
              <Paper elevation={4} style={{ padding: 40 }}>
                {/*<Grid item xs container spacing={0} justify='flex-start'>
                  <div className='form-group'>
                    <Button
                      type='button'
                        onClick={handleChangeLanguage}
                    >
                      change-language
                    </Button>
                  </div>
                </Grid>*/}
                <Grid container spacing={4} direction='row' alignItems='center' justify='center'>
                  <Grid item xs>
                    <Grid
                      container
                      spacing={2}
                      direction='column'
                      alignItems='center'
                      justify='center'>
                      <Grid item xs container style={{ padding: '0px 15px' }}>
                        {/*<Grid
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
                        </Grid>*/}
                      </Grid>
                      <br />
                    </Grid>
                    <LeftForm
                      Field={Field}
                      errors={errors}
                      ErrorMessage={ErrorMessage}
                      touched={touched}
                    />
                  </Grid>
                  <RigthForm
                    Field={Field}
                    errors={errors}
                    ErrorMessage={ErrorMessage}
                    isSaving={isSaving}
                    handleSubmit={handleSubmit}
                    setSubmitted={setSubmitted}
                    touched={touched}
                    router={router}
                  />
                </Grid>
              </Paper>
            </Form>
          )}
        />
      </Container>
    </div>
  );
};

//export async function getStaticProps({ params }) {
//  const { default: lngDict = {} } = await import(`../../../locales/${params.lng}.json`);

//  return {
//    props: { lng: params.lng, lngDict },
//  };
//}

//export async function getStaticPaths() {
//  return {
//    paths: languages.map((l) => ({ params: { lng: l } })),
//    fallback: false,
//  };
//}

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
export default Register;
