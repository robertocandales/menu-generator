import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import _ from 'lodash';
import { Paper, Grid, Avatar } from '@material-ui/core';
import { fetchCategories } from '../../../../firebase/db/category';
import SkeletonComponent from '../../../Global/SkeletonComponent';

const List = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            categories.push({
              ...doc.data(),
              id: doc.id,
              docRef: doc.ref,
            });
          });
          const user = JSON.parse(localStorage?.getItem('user'));
          if (categories.length) {
            setCategories(
              categories
                .filter((x) => x.user === user.email)
                .sort(function (a, b) {
                  if (a.title > b.title) {
                    return 1;
                  }
                  if (a.title < b.title) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
                }),
            );

            setLoading(false);
          }
        })
        .catch((er) => {
          console.log('error');
          console.log(er);
          setLoading(false);
        });
    };
    fetchData();
  }, []);
  return (
    <div style={{ width: '100%' }}>
      <Grid container direction='row' justify='center' alignItems='center' item spacing={2}>
        {loading ? (
          <Grid item sm={12} style={{ width: '100%', height: '100%' }}>
            {' '}
            <SkeletonComponent />
            <SkeletonComponent />
            <SkeletonComponent />
            <SkeletonComponent />
            <SkeletonComponent />
          </Grid>
        ) : (
          categories.map((cat, i) => (
            <div key={i} style={{ width: '100%' }}>
              {cat.isVisibleOnMenu ? (
                <Paper
                  elevation={3}
                  style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                    marginTop: '5px',
                    marginBottom: '5px',
                  }}>
                  <Grid
                    container
                    direction='row'
                    justify='flex-start'
                    alignItems='center'
                    item
                    spacing={3}>
                    <Grid item sm={2}>
                      <Avatar alt={cat.title} src={cat.image} />{' '}
                    </Grid>{' '}
                    <Grid item sm={6}>
                      {cat.title}
                    </Grid>
                  </Grid>
                </Paper>
              ) : null}
            </div>
          ))
        )}
      </Grid>
    </div>
  );
};

export default List;
