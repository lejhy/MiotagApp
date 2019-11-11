// @flow

import { RFValue } from 'react-native-responsive-fontsize';

const BASE_VALUE = 12;

export const PRIMARY = 'primary';
export const LARGE_HEADER = 'largeHeader';
export const HEADER = 'header';
export const SUB_HEADER = 'subHeader';
export const LARGE = 'large';
export const REGULAR = 'regular';
export const SMALL = 'small';

const fonts = {
  [PRIMARY]: 'Muli',
  size: {
    [LARGE_HEADER]: RFValue(BASE_VALUE * 3),
    [HEADER]: RFValue(BASE_VALUE * 2.5),
    [SUB_HEADER]: RFValue(BASE_VALUE * 2),
    [LARGE]: RFValue(BASE_VALUE * 1.8),
    [REGULAR]: RFValue(BASE_VALUE * 1.5),
    [SMALL]: RFValue(BASE_VALUE),
  },
};

export default fonts;
