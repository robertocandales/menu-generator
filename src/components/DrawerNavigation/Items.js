//import React from 'react';
//import { COLORS } from '../../Utils/Colors/color';
//import { withStyles, makeStyles } from '@material-ui/core/styles';

//import categoryIcon from '../../constants/Iconos/noun_Category_2706208.svg';
//import noun_menu_2275414 from '../../constants/Iconos/noun_menu_2275414.svg';
//import noun_dashboard_1264038 from '../../constants/Iconos/noun_dashboard_1264038.svg';
//import CategoryListDark from '../../constants/Iconos/CategoryListDark.svg';
//import CategoryListLight from '../../constants/Iconos/CategoryListLight.svg';
//import ItemListDark from '../../constants/Iconos/ItemListDark.svg';
//import ItemListLight from '../../constants/Iconos/ItemListLight.svg';
//import MenuBuilderDark from '../../constants/Iconos/MenuBuilderDark.svg';
//import MenuBuilderLight from '../../constants/Iconos/MenuBuilderLight.svg';
//import PromoBuilderDark from '../../constants/Iconos/PromoBuilderDark.svg';
//import PromoBuilderLight from '../../constants/Iconos/PromoBuilderLight.svg';
//import SocialNetworksPromoDark from '../../constants/Iconos/SocialNetworksPromoDark.svg';
//import SocialNetworksPromoLight from '../../constants/Iconos/SocialNetworksPromoLight.svg';
//import WaiterCallDark from '../../constants/Iconos/WaiterCallDark.svg';
//import WaiterCallLight from '../../constants/Iconos/WaiterCallLight.svg';
//import WizardDark from '../../constants/Iconos/WizardDark.svg';
//import WizardLight from '../../constants/Iconos/WizardLight.svg';
//import DashboardDark from '../../constants/Iconos/DashboardDark.svg';
//import DashboardLight from '../../constants/Iconos/DashboardLight.svg';
//import LogOutDark from '../../constants/Iconos/LogOutDark.svg';
//import LogOutLight from '../../constants/Iconos/LogOutLight.svg';
//import TeamDark from '../../constants/Iconos/TeamDark.svg';
//import TeamLight from '../../constants/Iconos/TeamLight.svg';
//import Tooltip from '@material-ui/core/Tooltip';
//import List from '@material-ui/core/List';

//import ListItem from '@material-ui/core/ListItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
//import ListItemText from '@material-ui/core/ListItemText';
//import { useRouter } from 'next/router';

//const useStyles = makeStyles({
//  root: {
//    width: 500,
//  },
//});
//const LightTooltip = withStyles((theme) => ({
//  tooltip: {
//    backgroundColor: '#333333',
//    color: 'rgb(210, 250, 192)',
//    boxShadow: theme.shadows[1],
//    fontSize: 20,
//  },
//}))(Tooltip);

//const Items = ({ currentRoute, open }) => {
//  const classes = useStyles();

//  const router = useRouter();

//  return (
//    <>
//      <List>
//        <ListItem
//          button
//          key='78378'
//          //onClick={() => {
//          //  router.push('/');
//          //          }}
//        >
//          {' '}
//          <LightTooltip
//            title='Update to premium and enjoy spectacular features'
//            placement='right-start'>
//            <ListItemIcon
//              style={{
//                color: currentRoute === '/' ? COLORS.SECONDARY : COLORS.WHITE,
//              }}
//              className={'font-size-xxl'}>
//              {currentRoute === '/dashboard' ? (
//                <img src={DashboardDark} alt='' style={{ width: '50px', height: '50px' }} />
//              ) : (
//                <img src={DashboardLight} alt='' style={{ width: '50px', height: '50px' }} />
//              )}{' '}
//            </ListItemIcon>
//          </LightTooltip>
//          {open && (
//            <ListItemText
//              primary='Dashboard'
//              style={currentRoute === '/dashboard' ? null : { color: 'rgb(210, 250, 192)' }}
//            />
//          )}
//        </ListItem>
//        <ListItem
//          button
//          key='1'
//          style={{
//            color: currentRoute === '/' ? COLORS.SECONDARY : COLORS.WHITE,
//            backgroundColor: currentRoute === '/' ? COLORS.PRIMARY : 'transparent',
//          }}
//          onClick={() => {
//            router.push('/');
//          }}>
//          <LightTooltip title='Category list' placement='right-start'>
//            <ListItemIcon
//              style={{
//                color: currentRoute === '/' ? COLORS.SECONDARY : COLORS.WHITE,
//              }}
//              className={'font-size-xxl'}>
//              {currentRoute === '/' ? (
//                <img src={CategoryListDark} alt='' style={{ width: '50px', height: '50px' }} />
//              ) : (
//                <img src={CategoryListLight} alt='' style={{ width: '50px', height: '50px' }} />
//              )}
//            </ListItemIcon>
//          </LightTooltip>
//          {open && (
//            <ListItemText
//              primary='Category list'
//              style={currentRoute === '/' ? null : { color: 'rgb(210, 250, 192)' }}
//            />
//          )}
//        </ListItem>
//        <ListItem
//          button
//          key='2'
//          style={{
//            color: currentRoute === '/categoryList' ? COLORS.SECONDARY : COLORS.WHITE,
//            backgroundColor: currentRoute === '/categoryList' ? COLORS.PRIMARY : 'transparent',
//          }}
//          onClick={() => {
//            router.push('/categoryList');
//          }}>
//          <LightTooltip title='Item list' placement='right-start'>
//            <ListItemIcon
//              style={{
//                color: currentRoute === '/categoryList' ? COLORS.SECONDARY : COLORS.WHITE,
//              }}
//              className={'font-size-xxl'}>
//              {currentRoute === '/categoryList' ? (
//                <img src={ItemListDark} alt='' style={{ width: '50px', height: '50px' }} />
//              ) : (
//                <img src={ItemListLight} alt='' style={{ width: '50px', height: '50px' }} />
//              )}
//            </ListItemIcon>
//          </LightTooltip>
//          {open && (
//            <ListItemText
//              primary='Item list'
//              style={currentRoute === '/categoryList' ? null : { color: 'rgb(210, 250, 192)' }}
//            />
//          )}
//        </ListItem>

//        <ListItem
//          button
//          key='36'
//          style={{
//            color: currentRoute === '/menuBuilder' ? COLORS.SECONDARY : COLORS.WHITE,
//            backgroundColor: currentRoute === '/menuBuilder' ? COLORS.PRIMARY : 'transparent',
//          }}
//          onClick={() => {
//            router.push('/menuBuilder');
//          }}>
//          {' '}
//          <LightTooltip title='Menu Builder' placement='right-start'>
//            <ListItemIcon
//              style={{
//                color: currentRoute === '/menuBuilder' ? COLORS.SECONDARY : COLORS.WHITE,
//              }}
//              className={'font-size-xxl'}>
//              {currentRoute === '/menuBuilder' ? (
//                <img src={MenuBuilderDark} alt='' style={{ width: '50px', height: '50px' }} />
//              ) : (
//                <img src={MenuBuilderLight} alt='' style={{ width: '50px', height: '50px' }} />
//              )}{' '}
//            </ListItemIcon>
//          </LightTooltip>
//          {open && (
//            <ListItemText
//              primary='Menu builder'
//              style={currentRoute === '/menuBuilder' ? null : { color: 'rgb(210, 250, 192)' }}
//            />
//          )}
//        </ListItem>
//        <ListItem
//          button
//          key='4'
//          //onClick={() => {
//          //  router.push('/promoBuilder');
//          //          }}
//        >
//          <LightTooltip
//            title='Update to premium and enjoy spectacular features'
//            placement='right-start'>
//            <ListItemIcon
//              style={{
//                color: currentRoute === '/promoBuilder' ? COLORS.SECONDARY : COLORS.WHITE,
//              }}
//              className={'font-size-xxl'}>
//              {currentRoute === '/PromoBuilder' ? (
//                <img src={PromoBuilderDark} alt='' style={{ width: '50px', height: '50px' }} />
//              ) : (
//                <img src={PromoBuilderLight} alt='' style={{ width: '50px', height: '50px' }} />
//              )}
//            </ListItemIcon>
//          </LightTooltip>
//          {open && (
//            <ListItemText
//              primary='Promo builder'
//              style={currentRoute === '/PromoBuilder' ? null : { color: 'rgb(210, 250, 192)' }}
//            />
//          )}
//        </ListItem>
//        <ListItem
//          button
//          key='5'
//          //style={{
//          //  color: COLORS.SECONDARY,
//          //  backgroundColor: COLORS.PRIMARY,
//          //}}
//          //onClick={() => {
//          //  router.push('/SocialNetworksPromo');
//          //          }}
//        >
//          {' '}
//          <LightTooltip
//            title='Update to premium and enjoy spectacular features'
//            placement='right-start'>
//            <ListItemIcon
//              style={{
//                color: COLORS.SECONDARY,
//              }}
//              className={'font-size-xxl'}>
//              {currentRoute === '/SocialNetworksPromo' ? (
//                <img
//                  src={SocialNetworksPromoDark}
//                  alt=''
//                  style={{ width: '50px', height: '50px' }}
//                />
//              ) : (
//                <img
//                  src={SocialNetworksPromoLight}
//                  alt=''
//                  style={{ width: '50px', height: '50px' }}
//                />
//              )}{' '}
//            </ListItemIcon>
//          </LightTooltip>
//          {open && (
//            <ListItemText
//              primary='Social network'
//              style={
//                currentRoute === '/SocialNetworksPromo' ? null : { color: 'rgb(210, 250, 192)' }
//              }
//            />
//          )}
//        </ListItem>
//        <ListItem
//          button
//          key='6'
//          //onClick={() => {
//          //  router.push('/Waiter');
//          //          }}
//        >
//          {' '}
//          <LightTooltip
//            title='Update to premium and enjoy spectacular features'
//            placement='right-start'>
//            <ListItemIcon
//              style={{
//                color: COLORS.SECONDARY,
//              }}
//              className={'font-size-xxl'}>
//              {currentRoute === '/Waiter' ? (
//                <img src={WaiterCallDark} alt='' style={{ width: '50px', height: '50px' }} />
//              ) : (
//                <img src={WaiterCallLight} alt='' style={{ width: '50px', height: '50px' }} />
//              )}{' '}
//            </ListItemIcon>
//          </LightTooltip>
//          {open && (
//            <ListItemText
//              primary='Waiter call'
//              style={currentRoute === '/Waiter' ? null : { color: 'rgb(210, 250, 192)' }}
//            />
//          )}
//        </ListItem>
//        <ListItem
//          button
//          key='7'
//          //onClick={() => {
//          //  router.push('/Wizard');
//          //          }}
//        >
//          {' '}
//          <LightTooltip
//            title='Update to premium and enjoy spectacular features'
//            placement='right-start'>
//            <ListItemIcon
//              style={{
//                color: COLORS.SECONDARY,
//              }}
//              className={'font-size-xxl'}>
//              {currentRoute === '/Wizard' ? (
//                <img src={WizardDark} alt='' style={{ width: '50px', height: '50px' }} />
//              ) : (
//                <img src={WizardLight} alt='' style={{ width: '50px', height: '50px' }} />
//              )}{' '}
//            </ListItemIcon>
//          </LightTooltip>
//          {open && (
//            <ListItemText
//              primary='Wizard'
//              style={currentRoute === '/Wizard' ? null : { color: 'rgb(210, 250, 192)' }}
//            />
//          )}
//        </ListItem>
//        <ListItem
//          button
//          key='8'
//          //onClick={() => {
//          //  router.push('/Wizard');
//          //          }}
//        >
//          {' '}
//          <LightTooltip
//            title='Update to premium and enjoy spectacular features'
//            placement='right-start'>
//            <ListItemIcon
//              style={{
//                color: COLORS.SECONDARY,
//              }}
//              className={'font-size-xxl'}>
//              {currentRoute === '/team' ? (
//                <img src={TeamDark} alt='' style={{ width: '50px', height: '50px' }} />
//              ) : (
//                <img src={TeamLight} alt='' style={{ width: '50px', height: '50px' }} />
//              )}{' '}
//            </ListItemIcon>
//          </LightTooltip>
//          {open && (
//            <ListItemText
//              primary='Team'
//              style={currentRoute === '/team' ? null : { color: 'rgb(210, 250, 192)' }}
//            />
//          )}
//        </ListItem>
//        <ListItem
//          button
//          onClick={() => {
//            localStorage.removeItem('user');
//            router.push('/auth/login');
//          }}>
//          {' '}
//          <LightTooltip title='Logout' placement='right-start'>
//            <ListItemIcon
//              style={{
//                color: COLORS.SECONDARY,
//              }}
//              className={'font-size-xxl'}>
//              {currentRoute === '/auth/login' ? (
//                <img src={LogOutDark} alt='' style={{ width: '50px', height: '50px' }} />
//              ) : (
//                <img src={LogOutLight} alt='' style={{ width: '50px', height: '50px' }} />
//              )}
//            </ListItemIcon>
//          </LightTooltip>
//          {open && (
//            <ListItemText
//              primary='Logout'
//              style={currentRoute === '/auth/login' ? null : { color: 'rgb(210, 250, 192)' }}
//            />
//          )}
//        </ListItem>
//      </List>
//    </>
//  );
//};

//export default Items;
