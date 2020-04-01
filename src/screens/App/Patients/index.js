// @flow

import { withNavigationFocus } from 'react-navigation';

import withScreenHeader from '@core/ScreenHeader/withScreenHeader';

import Patients from './Patients';

export default withScreenHeader({ title: 'Patients' })(withNavigationFocus(Patients));
