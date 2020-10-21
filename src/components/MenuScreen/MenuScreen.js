import React, { useState, useContext } from 'react';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import HeaderBar from './HeaderBar/HeaderBar';
import UploadButton from '../UploadButton/UploadButton';
import { COLORS } from '../../Utils/Colors/color';
import SwitchComponent from '../Global/SwitchComponent/SwitchComponent';
import SaveButton from '../Global/SaveButton/SaveButton';
import HourZone from './HourZone/HourZone';
import MiddleForm from './MiddleForm/MiddleForm';
import CategoriesAndProductsList from './CategoriesAndProductsList/CategoriesAndProductsList';
import RightSideBar from './RightSideBar/RightSideBar';
import LeftSideBar from './LeftSideBar/LeftSideBar';
import { useForm, Controller } from 'react-hook-form';
import { saveMenuConfig } from '../../firebase/db/menu-builder';
import { useRouter } from 'next/router';
import { getMenuConfig } from '../../firebase/db/digital-menu';
import SkeletonComponent from '../Global/SkeletonComponent';
import { store } from '../../context/store';

const TEMPLATES = [
  {
    id: 0,
    image: '/assets/images/Design01.png',
    backgroundImage: '/assets/images/textura_bg.png',
    textColor: '#fff',
    name: 'AmericanPremium',
  },
  {
    id: 1,
    image: '/assets/images/Design02.png',
    textColor: '#fff',
    name: 'NikuPremium',
  },
  {
    id: 2,
    image: '/assets/images/Design03.png',
    backgroundImage: '/assets/images/bg.png',
    name: 'SushiPremium',
  },
];
const MenuScreen = () => {
  const router = useRouter();
  const globalState = useContext(store);
  const { menuConfigState, menuConfigDispatch } = globalState;

  const [loading, setLoading] = useState(true);
  const [productWithPicture, setproductWithPicture] = useState(false);
  const [callWaiterButton, setCallWaiterButton] = useState(false);
  const [askForBillButton, setAskForBillButton] = useState(false);
  const [promoAsFirstPage, setpromoAsFirstPage] = useState(false);
  const [addDirection, setAddDirection] = useState('');
  const [storeName, setStoreName] = useState('');
  const [wifiName, setWifiName] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [enableWhatsappOrders, setEnableWhatsappOrders] = useState(false);
  const [monFriFrom, setMonFriFrom] = useState(new Date());
  const [monFriTo, setMonFriTo] = useState(new Date());
  const [satFrom, setSatFrom] = useState(new Date());
  const [satTo, setSatTo] = useState(new Date());
  const [sunFrom, setSunFrom] = useState(new Date());
  const [sunTo, setSunTo] = useState(new Date());
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [picture, setPicture] = useState('');
  const [DBTemplates, setDBTemplates] = useState(TEMPLATES);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [weekdaysFromTo, setWeekdaysFromTo] = useState({
    from: 'mon',
    to: 'fri',
  });

  const TimePickers = [
    {
      label: 'mon-fri',
      from: [monFriFrom, setMonFriFrom],
      to: [monFriTo, setMonFriTo],
    },
    {
      label: 'sat',
      from: [satFrom, setSatFrom],
      to: [satTo, setSatTo],
    },
    {
      label: 'sun',
      from: [sunFrom, setSunFrom],
      to: [sunTo, setSunTo],
    },
  ];

  const handleSubmit = async (data) => {
    const storeObj = {
      selectedTemplateId: selectedTemplateId,
      isProductsWithPicture: productWithPicture,
      isCallWaiterButton: callWaiterButton,
      isAskForBillButton: askForBillButton,
      isAddAsFirstPage: promoAsFirstPage,
      storeAddress: addDirection,
      storeName: storeName,
      picture: picture,
      wifiName: wifiName,
      wifiPass: wifiPass,
      weekdaysFromTo: weekdaysFromTo || {},
      timings: {
        monfri: [monFriFrom, monFriTo],
        sat: [satFrom, satTo],
        sun: [sunFrom, sunTo],
      },
      facebookId: facebook,
      instagramId: instagram,
      twitterId: twitter,
      whatsappNumber: whatsapp,
      isWhatsappOrdersEnabled: enableWhatsappOrders,
    };

    storeObj.storeCategories = visibleCategories.filter((cat) => {
      if (cat.isVisibleOnMenu) {
        return {
          id: cat.id,
          title: cat.title,
        };
      }
    });

    storeObj.storeProducts = visibleProducts.map((pr) => {
      return {
        id: pr.id,
        grossPrice: pr.priceI || '',
        price: pr.price,
        categoryId: pr.categoryId,
        name: pr.name,
      };
    });
    menuConfigDispatch({
      type: 'MENU_CONFIG',
      data: storeObj,
    });
    console.log(storeObj);

    saveMenuConfig(storeObj);
  };
  const convertData = (seconds, nanoseconds) => {
    return new Date(seconds * 1000 + nanoseconds / 1000000);
  };
  React.useEffect(() => {
    const menuConfigData = async () => {
      const res = await getMenuConfig();
      if (res) {
        setproductWithPicture(res.isProductsWithPicture);
        setCallWaiterButton(res.isCallWaiterButton);
        setAskForBillButton(res.isAskForBillButton);
        setpromoAsFirstPage(res.isAddAsFirstPage);
        setAddDirection(res.storeAddress);
        setStoreName(res.storeName);
        setWifiName(res.wifiName);
        setWifiPass(res.wifiPass);
        setFacebook(res.facebookId);
        setInstagram(res.instagramId);
        setTwitter(res.twitterId);
        setWhatsapp(res.whatsappNumber);
        setEnableWhatsappOrders(res.isWhatsappOrdersEnabled);
        setMonFriFrom(
          convertData(res?.timings?.monfri[0].seconds, res?.timings?.monfri[0].nanoseconds),
        );
        setMonFriTo(
          convertData(res?.timings?.monfri[1].seconds, res?.timings?.monfri[1].nanoseconds),
        );
        setSatFrom(convertData(res?.timings?.sat[0].seconds, res?.timings?.sat[0].nanoseconds));
        setSatTo(convertData(res?.timings?.sat[1].seconds, res?.timings?.sat[1].nanoseconds));
        setSunFrom(convertData(res?.timings?.sun[0].seconds, res?.timings?.sun[0].nanoseconds));
        setSunTo(convertData(res?.timings?.sun[1].seconds, res?.timings?.sun[1].nanoseconds));
        setVisibleCategories(res.storeCategories || []);
        setVisibleProducts(res.storeProducts);
        setPicture(res.picture);
        setSelectedTemplateId(res.selectedTemplateId);
        setWeekdaysFromTo(res.weekdaysFromTo);
        menuConfigDispatch({
          type: 'MENU_CONFIG',
          data: res,
        });
      }
      setLoading(false);
    };
    menuConfigData();
  }, []);
  return (
    <>
      {' '}
      {loading ? (
        <div style={{ height: '100vh' }}>
          {' '}
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
          <SkeletonComponent />
        </div>
      ) : (
        <>
          <Grid container spacing={2} direction='row' justify='center' alignItems='stretch'>
            <Grid item sm={2} xs={12} container>
              <LeftSideBar
                DBTemplates={DBTemplates}
                setSelectedTemplateId={setSelectedTemplateId}
                selectedTemplateId={selectedTemplateId}
              />
            </Grid>

            <Grid item sm={10} xs={12} container spacing={2}>
              <Grid
                item
                sm={12}
                xs={12}
                container
                direction='row'
                justify='space-around'
                alignItems='center'>
                <Grid xs={12} item container>
                  <Paper
                    elevation={3}
                    style={{
                      height: '10%',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px',
                      width: '100%',
                    }}>
                    <Grid
                      item
                      sm={12}
                      xs={12}
                      container
                      direction='row'
                      justify='space-between'
                      alignItems='stretch'
                      spacing={2}>
                      <HeaderBar
                        productWithPicture={productWithPicture}
                        setproductWithPicture={setproductWithPicture}
                        callWaiterButton={callWaiterButton}
                        setCallWaiterButton={setCallWaiterButton}
                        askForBillButton={askForBillButton}
                        setAskForBillButton={setAskForBillButton}
                        promoAsFirstPage={promoAsFirstPage}
                        setpromoAsFirstPage={setpromoAsFirstPage}
                        handleSubmit={handleSubmit}
                      />
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
              <Grid
                item
                sm={12}
                xs={12}
                container
                direction='row'
                justify='space-between'
                alignItems='flex-start'
                style={{ width: '100%', height: '100%' }}>
                <Grid
                  item
                  sm={9}
                  container
                  direction='column'
                  justify='space-between'
                  alignItems='center'
                  spacing={2}>
                  <MiddleForm
                    addDirection={addDirection}
                    setAddDirection={setAddDirection}
                    storeName={storeName}
                    setStoreName={setStoreName}
                    wifiName={wifiName}
                    setWifiName={setWifiName}
                    wifiPass={wifiPass}
                    setWifiPass={setWifiPass}
                    setPicture={setPicture}
                    picture={picture}
                  />
                  <CategoriesAndProductsList
                    setVisibleCategories={setVisibleCategories}
                    visibleCategories={visibleCategories}
                    setVisibleProducts={setVisibleProducts}
                    visibleProducts={visibleProducts}
                  />
                </Grid>
                <Grid
                  item
                  sm={3}
                  xs={12}
                  container
                  container
                  direction='column'
                  justify='space-between'
                  alignItems='stretch'>
                  <RightSideBar
                    facebook={facebook}
                    setFacebook={setFacebook}
                    instagram={instagram}
                    setInstagram={setInstagram}
                    twitter={twitter}
                    setTwitter={setTwitter}
                    whatsapp={whatsapp}
                    setWhatsapp={setWhatsapp}
                    enableWhatsappOrders={enableWhatsappOrders}
                    setEnableWhatsappOrders={setEnableWhatsappOrders}
                    TimePickers={TimePickers}
                    weekdaysFromTo={weekdaysFromTo}
                    setWeekdaysFromTo={setWeekdaysFromTo}
                    TEMPLATES={TEMPLATES}
                    selectedTemplateId={selectedTemplateId}
                  />
                </Grid>
              </Grid>{' '}
            </Grid>
            {/*<Button
              style={{ backgroundColor: COLORS.PRIMARY }}
              onClick={() => router.push(TEMPLATES[selectedTemplateId].name)}>
              Digital Menu
            </Button>*/}
          </Grid>
        </>
      )}
    </>
  );
};

export default MenuScreen;
