import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
});

const SkeletonComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation='wave' /> <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation='wave' /> <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation='wave' />
    </div>
  );
};

export default SkeletonComponent;
