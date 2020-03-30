// @flow


import withScreenHeader from '@core/ScreenHeader/withScreenHeader';

import Notifications from './Notifications';

export default withScreenHeader({ title: 'Notifications', includeAlerts: false })(Notifications);
