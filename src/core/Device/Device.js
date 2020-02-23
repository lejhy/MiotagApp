import {MathUtils, Quaternion, Vector3} from 'three';

export class Fingers {
  thumb = undefined;
  index = undefined;
  middle = undefined;
  ring = undefined;
  pinkie = undefined;

  constructor(defaultValueGetter) {
    for(const fingerName in this) {
      this[fingerName] = defaultValueGetter();
    }
  }
}

export class Device {
  fingers = new Fingers(() => 0);

  // X-axis points forward, Y-axis to the right and Z-axis downward
  acc = new Vector3(); // Gravity in Newtons * 10

  // X-axis points forward, Y-axis to the right and Z-axis downward
  axes = new Vector3(); // Angle in degrees

  // THREE JS Coordinate System where X-axis points to the right, Y-axis upward and Z-axis backward
  quaternions = new Quaternion(); // Standard 0-1

  updateIMU(imuState) {
    if (state) {
      this.acc = new Vector3(imuState[0], imuState[1], imuState[2]);
      this.axes = new Vector3(imuState[3], imuState[4], imuState[5]);
    }
  }

  updateQuaternions(quaternionState) {
    if (quaternionState) {
      this.quaternions = new Quaternion(quaternionState[0], quaternionState[1], quaternionState[2], quaternionState[3])
    }
  }

  mockingState = {
    fingers: new Fingers(() => MathUtils.randFloat(0.01, 0.1)),
    acc: new Vector3(MathUtils.randFloat(0,5), MathUtils.randFloat(0,5), MathUtils.randFloat(0,5)),
    axes: new Vector3(MathUtils.randFloat(0,1), MathUtils.randFloat(0,1), MathUtils.randFloat(0,1))
  };

  mockAll() {
    this.mockFingers();
    this.mockAcc();
    this.mockAxes();
  }

  mockFingers() {
    for(const fingerName in this.fingers) {
      let oldValue = this.fingers[fingerName];
      let newValue = MathUtils.clamp(oldValue + this.mockingState.fingers[fingerName], 0, 1);
      if (newValue === 0 || newValue === 1) this.mockingState.fingers[fingerName] *= -1;
      this.fingers[fingerName] = newValue;
    }
  }

  mockAxes() {
    this.axes.add(this.mockingState.axes);
  }

  mockAcc() {
    this.acc.add(this.mockingState.acc);
    if(this.acc.length() > 100) {
      this.mockingState.acc.multiplyScalar(-1);
    }
  }
}
