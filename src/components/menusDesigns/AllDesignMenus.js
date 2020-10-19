import React from 'react';
import Allergies from './Allergies';
import AmericanBasic from './AmericanMenu/AmericanBasic';
import AmericanDetails from './AmericanMenu/AmericanDetails';
import AmericanPremium from './AmericanMenu/AmericanPremium';
import AmericanPromo from './AmericanMenu/AmericanPromo';
import NikuBasic from './NikuMenu/NikuBasic';
import NikuPremium from './NikuMenu/NikuPremium';
import SushiPremium from './SushiMenu/SushiPremium';

const AllDesignMenus = ({ Menus }) => {
  return (
    <div>
      {Menus === 'Allergies' ? (
        <Allergies />
      ) : Menus === 'AmericanPremium' ? (
        <AmericanPremium />
      ) : Menus === 'SushiPremium' ? (
        <SushiPremium />
      ) : Menus === 'NikuBasic' ? (
        <NikuBasic />
      ) : Menus === 'NikuPremium' ? (
        <NikuPremium />
      ) : (
        'no existe menu'
      )}
    </div>
  );
};

export default AllDesignMenus;
