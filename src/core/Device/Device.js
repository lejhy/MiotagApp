import { MathUtils, Vector3 } from 'three';

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
  acc = new Vector3();
  gyro = new Vector3();
  mag = new Vector3(); // ignore for now...

  mockingState = {
    fingers: new Fingers(() => MathUtils.randFloat(0.01, 0.1)),
    acc: new Vector3(MathUtils.randFloat(0,0.5), MathUtils.randFloat(0,0.5), MathUtils.randFloat(0,0.5)),
    gyro: new Vector3(MathUtils.randFloat(0,1), MathUtils.randFloat(0,1), MathUtils.randFloat(0,1))
  };

  mockAll() {
    this.mockFingers();
    this.mockGyro();
    this.mockAcc();
  }

  mockFingers() {
    for(const fingerName in this.fingers) {
      let oldValue = this.fingers[fingerName];
      let newValue = MathUtils.clamp(oldValue + this.mockingState.fingers[fingerName], 0, 1);
      if (newValue === 0 || newValue === 1) this.mockingState.fingers[fingerName] *= -1;
      this.fingers[fingerName] = newValue;
    }
  }

  mockGyro() {
    this.gyro.add(this.mockingState.gyro);
  }

  mockAcc() {
    this.acc.add(this.mockingState.acc);
    if(this.acc.length() > 10) {
      this.mockingState.acc.multiplyScalar(-1);
    }
  }
}
