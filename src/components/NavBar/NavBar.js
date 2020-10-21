import React from 'react';
import { useRouter } from 'next/router';

import { Home } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { COLORS } from '../../Utils/Colors/color';
import { withStyles } from '@material-ui/core/styles';

import {
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
  Avatar,
  ListItem,
  ListItemText,
} from '@material-ui/core';

const styles = (theme) => ({
  row: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  container: {
    width: 1170,
    margin: 'auto',
  },
  buttonFontSize: {
    fontSize: '11px',
    color: '#a1a1a1',
  },

  AppBar: {
    //height:400,
    //background: `url("http://lorempixel.com/1920/1080/nature") no-repeat center center`,
    backgroundColor: '#fff',
    backgroundSize: 'cover',
  },
  mainLogo: {
    color: '#a1a1a1',
    justifyContent: 'left',
    '&:hover': {
      background: 'transparent',
    },
  },

  avatar: {
    height: '100%',
    borderRadius: 0,
  },

  loginButton: {
    background: '#e91e63',
    color: '#fff',
    borderRadius: '25px',
    padding: '0px 25px',

    '&:hover': {
      background: 'blue',
      boxShadow: '0px 2px 10px #888888',
    },
  },
});

const navLinks = [
  { title: `Categories`, path: `/` },
  { title: `Products`, path: `/categoryList` },
  { title: `Menu Generator`, path: `/menuBuilder` },
  { title: `Logout`, path: `/auth/login` },
  //  { title: `faq`, path: `/faq` },
];
//router.push;
const NavBar = () => {
  const [state, setState] = React.useState({
    anchorEl: null,
  });

  const { anchorEl } = state;
  const open = Boolean(anchorEl);
  const router = useRouter();
  const classes = styles();

  const handleMenu = (event) => {
    setState({ anchorEl: event.currentTarget });
    console.log(event.currentTarget);
  };

  const handleClose = () => {
    setState({ anchorEl: null });
  };
  const currentRoute = router.pathname;

  return (
    <div
      className={classes.root}
      style={router.query.menus ? { display: 'none' } : { display: 'flex' }}>
      <AppBar
        position='static'
        className={classes.AppBar}
        style={router.query.menus ? { display: 'none' } : { display: 'flex' }}>
        <Grid item sm={12} xs={12} className={classes.container}>
          <Toolbar>
            <Grid className={classes.grow}>
              <Button className={[classes.mainLogo]}>
                <Avatar
                  src='https://uploads.codesandbox.io/uploads/user/3e41a372-fc65-4387-bca0-70a050914db8/VIR9-logo.jpg'
                  className={classes.avatar}
                />
              </Button>
            </Grid>
            {/*<Button color='inherit' onClick={handleMenu} className={classes.buttonFontSize}>
              Discover
            </Button>*/}
            {/*<Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>*/}
            {navLinks.map(({ title, path }) => (
              <Button
                onClick={() => router.push(path)}
                key={title}
                className={classes.linkText}
                style={router.pathname === path ? { color: COLORS.SECONDARY } : null}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </Button>
            ))}
            {/*<Button color='inherit' className={classes.buttonFontSize}>
              Profile
            </Button>
            <Button color='inherit' className={[classes.buttonFontSize, classes.loginButton]}>
              Login
            </Button>*/}
          </Toolbar>
        </Grid>
      </AppBar>
    </div>
  );
};

export default NavBar;
