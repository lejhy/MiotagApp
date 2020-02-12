// @flow

const PinkieUUID = '19B10002-E8F2-537E-4F6C-D104768A1214';
const IndexUUID = '19B10003-E8F2-537E-4F6C-D104768A1214';
const MiddleUUID = '19B10004-E8F2-537E-4F6C-D104768A1214';
const RingUUID = '19B10005-E8F2-537E-4F6C-D104768A1214';
const ThumbUUID = '19B10006-E8F2-537E-4F6C-D104768A1214';
const RollUUID = '19B10007-E8F2-537E-4F6C-D104768A1214';
const PitchUUID = '19B10008-E8F2-537E-4F6C-D104768A1214';
const YawUUID = '19B10009-E8F2-537E-4F6C-D104768A1214';

const SENSORS = {
  [ThumbUUID]: 'thumb',
  [IndexUUID]: 'index',
  [MiddleUUID]: 'middle',
  [RingUUID]: 'ring',
  [PinkieUUID]: 'pinkie',
  [RollUUID]: 'roll',
  [PitchUUID]: 'pitch',
  [YawUUID]: 'yaw',
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
};

export { SENSORS, reducer, initialState };
const sensors = {
  SENSORS,
  reducer,
  initialState,
};
export default sensors;
