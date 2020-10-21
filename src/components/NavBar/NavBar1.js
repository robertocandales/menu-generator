import React from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
//import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import MoreIcon from '@material-ui/icons/MoreVert';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';

import CategoryIcon from '@material-ui/icons/Category';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useRouter } from 'next/router';
import { COLORS } from '../../Utils/Colors/color';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function NavBar1({ discountCode, inProgress }) {
  const router = useRouter();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton aria-label='show 4 new mails' color='inherit'>
          <Badge
            //badgeContent={inProgress.assigned ? inProgress.assigned.length : 0}
            badgeContent={null}
            color='secondary'>
            <AccountCircleIcon />
          </Badge>
        </IconButton>
        <p>Categories</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={null} color='secondary'>
            <FastfoodIcon />
          </Badge>
        </IconButton>
        <p>Products</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={null} color='secondary'>
            <MenuBookIcon />
          </Badge>
        </IconButton>

        <p>Menu Generator</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={null} color='secondary'>
            <ExitToAppIcon />
          </Badge>
        </IconButton>

        <p>Logout</p>
      </MenuItem>
      {/*<MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'>
          <AccountCircle />
        </IconButton>

        <p>Usuarios</p>
      </MenuItem>*/}
    </Menu>
  );
  const redirect = ({ route }) => {
    router.push(route);
  };
  return (
    <div className={classes.grow}>
      <AppBar
        position='static'
        color='primary'
        style={router.query.menus ? { display: 'none' } : { display: 'flex' }}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'>
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6' noWrap>
            Menu Generator
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              style={router.pathname === '/' ? { color: COLORS.SECONDARY } : null}
              aria-label='show 4 new mails'
              color='inherit'
              onClick={() => redirect({ route: '/' })}>
              <Typography className={classes.title} variant='subtitle1' noWrap>
                Categories{' '}
              </Typography>
              <Badge badgeContent={null} color='secondary'>
                <CategoryIcon />
              </Badge>
            </IconButton>
            <IconButton
              style={router.pathname === '/categoryList' ? { color: COLORS.SECONDARY } : null}
              aria-label='show 4 new mails'
              color='inherit'
              onClick={() => redirect({ route: '/categoryList' })}>
              <Typography className={classes.title} variant='subtitle1' noWrap>
                Products{' '}
              </Typography>
              <Badge badgeContent={null} color='secondary'>
                <FastfoodIcon />
              </Badge>
            </IconButton>
            <IconButton
              style={router.pathname === '/menuBuilder' ? { color: COLORS.SECONDARY } : null}
              aria-label='show 4 new mails'
              color='inherit'
              onClick={() => redirect({ route: '/menuBuilder' })}>
              <Typography className={classes.title} variant='subtitle1' noWrap>
                Menu Generator{' '}
              </Typography>
              <Badge badgeContent={null} color='secondary'>
                <MenuBookIcon />
              </Badge>
            </IconButton>
            <IconButton
              style={router.pathname === '/auth/login' ? { color: COLORS.SECONDARY } : null}
              aria-label='show 4 new mails'
              color='inherit'
              onClick={() => redirect({ route: '/auth/login' })}>
              <Typography className={classes.title} variant='subtitle1' noWrap>
                Logout
              </Typography>
              <Badge badgeContent={null} color='secondary'>
                <ExitToAppIcon />
              </Badge>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'>
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
