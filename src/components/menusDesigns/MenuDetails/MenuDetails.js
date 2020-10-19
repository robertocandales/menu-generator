import React from 'react';
import AmericanDetails from '../AmericanMenu/AmericanDetails';
import NikuDetails from '../NikuMenu/NikuDetails';
import SushiDetails from '../SushiMenu/SushiDetails';

const MenuDetails = ({ details }) => {
  return (
    <div>
      {details === 'NikuDetails' ? (
        <NikuDetails />
      ) : details === 'AmericanDetails' ? (
        <AmericanDetails />
      ) : details === 'SushiDetails' ? (
        <SushiDetails />
      ) : (
        'no hay detalles'
      )}
    </div>
  );
};

export default MenuDetails;
