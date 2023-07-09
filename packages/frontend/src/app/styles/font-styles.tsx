import Poppins from './fonts/Poppins-Medium.ttf';
import { extendTheme } from '@chakra-ui/react';
import { Global } from '@emotion/react';

export const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: 'Poppins';
      src: url(${Poppins}) format('truetype');
      font-weight: 500;
      font-style: normal;
      font-display: auto;
    }
      `}
  />
);

export const theme = extendTheme({
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
});
