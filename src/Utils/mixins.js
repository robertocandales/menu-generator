/* eslint-disable indent */
import { css } from 'styled-components';

export const breakpoints = {
  mobileMin: '351px',
  mobile: '767px',
  mobilePortrait: '320px',
  mobileLandscape: '320px',
  tablet: '1024px',
  tabletPortrait: '768px',
  tabletLandscape: '768px',
  desktop: '1025px',
};

export const respondTo = Object.keys(breakpoints).reduce((accumulator, label) => {
  accumulator[label] = (...args) => {
    switch (label) {
      case 'mobileMin':
        return css`
          @media (max-width: ${breakpoints[label]}) {
            ${css(...args)};
          }
        `;
      case 'mobile':
        return css`
          @media (max-width: ${breakpoints[label]}) {
            ${css(...args)};
          }
        `;
      case 'mobilePortrait':
        return css`
          @media (min-width: ${breakpoints[
              label
            ]}) and (max-width: ${breakpoints.mobile}) and (orientation: portrait) {
            ${css(...args)};
          }
        `;
      case 'mobileLandscape':
        return css`
          @media (min-width: ${breakpoints[
              label
            ]}) and (max-width: ${breakpoints.mobile}) and (orientation: landscape) {
            ${css(...args)};
          }
        `;
      case 'tablet':
        return css`
          @media (min-width: ${breakpoints.tabletPortrait}) and (max-width: ${breakpoints.tablet}) {
            ${css(...args)};
          }
        `;
      case 'tabletPortrait':
        return css`
          @media (min-width: ${breakpoints[
              label
            ]}) and (max-width: ${breakpoints.tablet}) and (orientation: portrait) {
            ${css(...args)};
          }
        `;
      case 'tabletLandscape':
        return css`
          @media (min-width: ${breakpoints[
              label
            ]}) and (max-width: ${breakpoints.tablet}) and (orientation: landscape) {
            ${css(...args)};
          }
        `;
      case 'desktop':
      default:
        return css`
          @media (min-width: ${breakpoints[label]}) {
            ${css(...args)};
          }
        `;
    }
  };
  return accumulator;
}, {});
