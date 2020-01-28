// @flow

const NO_LOGS = 'No recorded activities';

const HEALTHY = 'You’re doing very well! You show a very healthy progress.';

const getSummary = (logs) => (logs.length === 0 ? NO_LOGS : HEALTHY);

export default getSummary;
