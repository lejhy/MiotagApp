// @flow

import { withTheme } from 'styled-components';

import withScreenHeader from '@core/ScreenHeader/withScreenHeader';
import Dashboard from './Dashboard';

export default withScreenHeader({ title: 'Home', includeBackButton: false })(withTheme(Dashboard));
