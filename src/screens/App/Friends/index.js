// @flow

import { withNavigationFocus } from 'react-navigation';

import withScreenHeader from '@core/ScreenHeader/withScreenHeader';

import Friends from './Friends';

export default withScreenHeader({ title: 'Friends' })(withNavigationFocus(Friends));
