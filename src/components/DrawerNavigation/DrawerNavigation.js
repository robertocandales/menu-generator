import { useRouter } from 'next/router';
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Avatar from '@material-ui/core/Avatar';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { COLORS } from '../../Utils/Colors/color';

import { getUserData } from '../../firebase/db/utils';
import Items from './Items';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  drawer: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#333333',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: '#333333',
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(11),
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    flexDirection: 'column',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
  },
  contentPadding: {
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(5),
  },
  clip: {
    height: 80,
    width: 20,
    backgroundColor: '#333333',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
    marginTop: '5em',
    position: 'fixed',
  },
  clipOpen: {
    marginLeft: drawerWidth - 5,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  clipClose: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: theme.spacing(7) - 5,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(11) - 5,
    },
  },
  ishidden: {
    display: `none`,
  },
}));

const DrawerNavigation = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const router = useRouter();

  const handleDrawerOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleDrawerClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const [userData, setUserData] = React.useState({});
  React.useEffect(() => {
    (async () => {
      const res = await getUserData();
      setUserData(res);
    })();
  }, []);

  const currentRoute = router.pathname;

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        anchor={theme.direction === 'rtl' ? 'top' : 'bottom'}
        style={router.query.menus ? { display: 'none' } : { display: 'flex' }}
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
          [classes.ishidden]: hidden,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}>
        <div className={classes.toolbar}>
          {open ? (
            <img
              alt='big-logo'
              style={{ width: '50%', height: 'auto' }}
              src={'https://menudigital.gal/archivos/imagenes/imagen-header.png'}
            />
          ) : (
            <Avatar
              style={{ width: 50, height: 'auto' }}
              src={'https://menudigital.gal/archivos/imagenes/imagen-header.png'}
            />
          )}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '2em',
            }}>
            {' '}
            <Avatar
              style={{
                width: 70,
                height: 'auto',
                // margin: '2em'
              }}
              src={
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRzbk3YmKA-JytIht3_JdDSGnEJvty8Gj7lug&usqp=CAU'
              }
            />
            {open && (
              <div
                style={{
                  margin: '1em',
                  color: COLORS.WHITE,
                }}>
                <Typography variant='h5'>
                  {userData?.adminName} {userData?.lastName}{' '}
                </Typography>
                <Typography>{userData?.bussinessAddress}</Typography>
              </div>
            )}
          </div>
        </div>
        <Divider style={{ backgroundColor: COLORS.SECONDARY }} />
        <Items currentRoute={currentRoute} open={open} />
      </Drawer>
      <div
        style={router.query.menus ? { display: 'none' } : { display: 'flex' }}
        className={clsx(classes.clip, {
          [classes.clipOpen]: open,
          [classes.clipClose]: !open,
          [classes.ishidden]: hidden,
        })}
        onClick={open ? (e) => handleDrawerClose(e) : (e) => handleDrawerOpen(e)}>
        <IconButton edge='start' style={{ color: COLORS.WHITE }}>
          {!open || theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <main
        className={clsx(classes.content, {
          [classes.contentPadding]: !hidden,
        })}>
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

export default DrawerNavigation;
