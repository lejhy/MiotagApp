// @flow

const PinkieUUID = '19B10002-E8F2-537E-4F6C-D104768A1214';
const IndexUUID = '19B10003-E8F2-537E-4F6C-D104768A1214';
const MiddleUUID = '19B10004-E8F2-537E-4F6C-D104768A1214';
const RingUUID = '19B10005-E8F2-537E-4F6C-D104768A1214';
const ThumbUUID = '19B10006-E8F2-537E-4F6C-D104768A1214';
const RollUUID = '19B10007-E8F2-537E-4F6C-D104768A1214';
const PitchUUID = '19B10008-E8F2-537E-4F6C-D104768A1214';
const YawUUID = '19B10009-E8F2-537E-4F6C-D104768A1214';
const AccXUUID = '19B10010-E8F2-537E-4F6C-D104768A1214';
const AccYUUID = '19B10011-E8F2-537E-4F6C-D104768A1214';
const AccZUUID = '19B10012-E8F2-537E-4F6C-D104768A1214';
const GyroXUUID = '19B10013-E8F2-537E-4F6C-D104768A1214';
const GyroYUUID = '19B10014-E8F2-537E-4F6C-D104768A1214';
const GyroZUUID = '19B10015-E8F2-537E-4F6C-D104768A1214';
const MagXUUID = '19B10016-E8F2-537E-4F6C-D104768A1214';
const MagYUUID = '19B10017-E8F2-537E-4F6C-D104768A1214';
const MagZUUID = '19B10018-E8F2-537E-4F6C-D104768A1214';

const SENSORS = {
  [ThumbUUID]: 'thumb',
  [IndexUUID]: 'index',
  [MiddleUUID]: 'middle',
  [RingUUID]: 'ring',
  [PinkieUUID]: 'pinkie',
  [RollUUID]: 'roll',
  [PitchUUID]: 'pitch',
  [YawUUID]: 'yaw',
  [AccXUUID]: 'accX',
  [AccYUUID]: 'accY',
  [AccZUUID]: 'accZ',
  [GyroXUUID]: 'gyroX',
  [GyroYUUID]: 'gyroY',
  [GyroZUUID]: 'gyroZ',
  [MagXUUID]: 'magX',
  [MagYUUID]: 'magY',
  [MagZUUID]: 'magZ'
};

const reducer = (state, action) => {
  switch (action.type) {
    case SENSORS[ThumbUUID]:
      return {
        ...state,
        fingers: {
          ...state.fingers,
          [SENSORS[ThumbUUID]]: action.value,
        },
      };
    case SENSORS[IndexUUID]:
      return {
        ...state,
        fingers: {
          ...state.fingers,
          [SENSORS[IndexUUID]]: action.value,
        },
      };
    case SENSORS[MiddleUUID]:
      return {
        ...state,
        fingers: {
          ...state.fingers,
          [SENSORS[MiddleUUID]]: action.value,
        },
      };
    case SENSORS[RingUUID]:
      return {
        ...state,
        fingers: {
          ...state.fingers,
          [SENSORS[RingUUID]]: action.value,
        },
      };
    case SENSORS[PinkieUUID]:
      return {
        ...state,
        fingers: {
          ...state.fingers,
          [SENSORS[PinkieUUID]]: action.value,
        },
      };
    case SENSORS[RollUUID]:
      return {
        ...state,
        axes: {
          ...state.axes,
          roll: action.value,
        },
      };
    case SENSORS[PitchUUID]:
      return {
        ...state,
        axes: {
          ...state.axes,
          pitch: action.value,
        },
      };
    case SENSORS[YawUUID]:
      return {
        ...state,
        axes: {
          ...state.axes,
          yaw: action.value,
        },
      };
    case SENSORS[AccXUUID]:
      return {
        ...state,
        acc: {
          ...state.acc,
          x: action.value,
        },
      };
    case SENSORS[AccYUUID]:
      return {
        ...state,
        acc: {
          ...state.acc,
          y: action.value,
        },
      };
    case SENSORS[AccZUUID]:
      return {
        ...state,
        acc: {
          ...state.acc,
          z: action.value,
        },
      };
    case SENSORS[GyroXUUID]:
      return {
        ...state,
        gyro: {
          ...state.gyro,
          x: action.value,
        },
      };
    case SENSORS[GyroYUUID]:
      return {
        ...state,
        gyro: {
          ...state.gyro,
          y: action.value,
        },
      };
    case SENSORS[GyroZUUID]:
      return {
        ...state,
        gyro: {
          ...state.gyro,
          z: action.value,
        },
      };
    case SENSORS[MagXUUID]:
      return {
        ...state,
        mag: {
          ...state.mag,
          x: action.value,
        },
      };
    case SENSORS[MagYUUID]:
      return {
        ...state,
        mag: {
          ...state.mag,
          y: action.value,
        },
      };
    case SENSORS[MagZUUID]:
      return {
        ...state,
        mag: {
          ...state.mag,
          z: action.value,
        },
      };
    default:
      return { ...state };
  }
};

const initialState = {
  fingers: {
    thumb: null,
    index: null,
    middle: null,
    ring: null,
    pinkie: null,
  },
  axes: {
    roll: null,
    pitch: null,
    yaw: null,
  },
  acc: {
    x: null,
    y: null,
    z: null
  },
  gyro: {
    x: null,
    y: null,
    z: null
  },
  mag: {
    x: null,
    y: null,
    z: null
  },
};

export { SENSORS, reducer, initialState };
const sensors = {
  SENSORS,
  reducer,
  initialState,
};
export default sensors;
