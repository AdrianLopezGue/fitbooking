import { createGlobalStyle } from 'styled-components';
import Poppins from './fonts/Poppins-Medium.ttf';

const FontStyles = createGlobalStyle`
@font-face {
  font-family: 'Poppins';
  src: url(${Poppins}) format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: auto;
}

body {
  font-family: 'Poppins';
  margin: 0;
}
`;

export default FontStyles;
