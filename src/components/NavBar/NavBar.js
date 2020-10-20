import React from 'react';
import { useRouter } from 'next/router';

import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Container,
  Button,
} from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { COLORS } from '../../Utils/Colors/color';

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
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
  const router = useRouter();
  const classes = useStyles();
  return (
    <AppBar
      position='static'
      style={router.query.menus ? { display: 'none' } : { display: 'flex' }}>
      <Toolbar>
        <Container maxWidth='md' className={classes.navbarDisplayFlex}>
          <IconButton edge='start' color='inherit' aria-label='home'>
            <Home fontSize='large' />
          </IconButton>
          <List
            component='nav'
            aria-labelledby='main navigation'
            className={classes.navDisplayFlex}>
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
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
