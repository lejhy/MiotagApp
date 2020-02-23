// @flow

import React, { PureComponent } from 'react';
import { AppRegistry, PixelRatio, StyleSheet, SyntheticEvent, View } from 'react-native';
import { GLView } from 'expo-gl';
import {
  AmbientLight,
  DirectionalLight,
  Euler,
  Fog,
  GridHelper,
  MathUtils,
  MeshPhongMaterial,
  PerspectiveCamera, Quaternion,
  Raycaster,
  Scene,
  SkinnedMesh,
  Vector2,
  Vector3,
} from 'three';
import Renderer from 'expo-three/build/Renderer';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Asset } from 'expo-asset';
import Button from '@core/Button/Button';
import { Device, Fingers } from '@core/Device/Device';
import { readAsStringAsync } from 'expo-file-system';
import { FileSystem } from 'react-native-unimodules';
import { decode } from 'base64-arraybuffer';
import ActivitiesService from '@services/api/ActivitiesService';

const maxFingerRotation = MathUtils.degToRad(-90);
const pixelRatio = PixelRatio.get();

export default class FreeMode extends PureComponent {

  state = {
    mocking: false,
    loaded: false
  };

  createdAt = new Date();
  renderTimeout: Number;
  rayCaster = new Raycaster();
  device = new Device();

  renderer: Renderer;
  camera: PerspectiveCamera;
  cameraTarget = new Vector3();
  scene: Scene;
  grid: GridHelper;
  hand = {
    scene: (null: any),
    mesh: (null: SkinnedMesh),
    fingers: new Fingers(() => []),
    deviceRotationOffset: new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -0.5*Math.PI)
  };

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    clearTimeout(this.renderTimeout);
    ActivitiesService.newLog({
      activity: {
        id: this.props.navigation.getParam('id')
      },
      length: new Date() - this.createdAt,
      score: 0
    });
  }

  update() {
    if (this.state.loaded) {
      if (this.state.mocking) {
        this.device.mockAll();
      } else {
        this.device.updateIMU(this.props.getSensors());
        this.device.updateQuaternions(this.props.getQuaternions());
      }

      this.updateFingers();
      this.updateAcc();
      this.updateAxes();

      this.camera.lookAt(this.cameraTarget.lerp(this.hand.scene.position, 0.1));
    }
  }

  updateFingers() {
    for(const fingerName in this.device.fingers) {
      let rotation = this.device.fingers[fingerName] * maxFingerRotation;
      let finger = this.hand.fingers[fingerName];
      finger[1].rotation.z = rotation;
      finger[2].rotation.z = rotation;
    }
  }

  updateAcc() {
    let targetPosition = this.device.acc.clone();
    targetPosition.multiplyScalar(-0.01).clampLength(0, 1).applyQuaternion(this.device.quaternions);
    this.hand.scene.position.lerp(targetPosition, 0.5);
  }

  updateAxes() {
    let targetRotation = this.device.quaternions.clone();
    targetRotation.multiply(this.hand.deviceRotationOffset);
    this.hand.scene.quaternion.slerp(targetRotation, 0.5);
  }

  onContextCreate = async gl => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = 0x101010;

    // Create a WebGLRenderer without a DOM element
    this.renderer = new Renderer({ gl });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(sceneColor);

    this.camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
    this.camera.position.set(0, 0.5, 5);
    this.camera.far = 10;
    this.camera.lookAt(this.cameraTarget);


    this.scene = new Scene();
    this.scene.fog = new Fog(sceneColor, 1, 10000);
    this.grid = new GridHelper(50, 50);
    this.grid.position.set(0, -3, 0);
    this.scene.add(this.grid);

    const ambientLight = new AmbientLight(0x666666);
    this.scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(2, 1, 1);
    this.scene.add(directionalLight);

    const asset = Asset.fromModule(require('@assets/models/RiggedHand.glb'));
    if (!asset.localUri) {
      await asset.downloadAsync();
    }
    const assetBase64 = await readAsStringAsync(asset.localUri, {encoding: FileSystem.EncodingType.Base64});
    let assetArrayBuffer = decode(assetBase64);

    const loader = new GLTFLoader();
    loader.parse(
      assetArrayBuffer,
      null,
      (gltf) => {
        this.hand.scene = gltf.scene;
        this.scene.add(this.hand.scene);
        this.hand.scene.traverse(o => {
          if (o.isBone) {
            let name = o.name.slice(0, o.name.length - 1).toLowerCase();
            for (const fingerName in this.hand.fingers) {
              if (fingerName === name) {
                this.hand.fingers[fingerName].push(o);
              }
            }
          }
          if (o.type === "SkinnedMesh") {
            this.hand.mesh = o;
            o.castShadow = true;
            o.receiveShadow = true;
            o.material = new MeshPhongMaterial({
              color: 0x0CC2CC,
              skinning: true
            });
          }
        });
        this.state.loaded = true
      },
    (error) => {
        console.log(error);
        console.error(error);
      }
    );

    // Setup an animation loop
    const render = () => {
      this.renderTimeout = requestAnimationFrame(render);
      this.update();
      this.renderer.render(this.scene, this.camera);
      gl.endFrameEXP();
    };
    render();
  };

  touchStart(event: SyntheticEvent) {
    let position = new Vector2();
    position.x = (event.nativeEvent.pageX * pixelRatio / this.renderer.domElement.width) * 2 - 1;
    position.y = - (event.nativeEvent.pageY * pixelRatio / this.renderer.domElement.height) * 2 + 1;

    this.rayCaster.setFromCamera( position, this.camera );
    let handIntersects = this.rayCaster.intersectObjects( [this.hand.mesh] );
    if (handIntersects.length > 0) {
      let color = this.hand.mesh.material.color;
      color.r = MathUtils.randFloat(0, 1);
      color.g = MathUtils.randFloat(0, 1);
      color.b = MathUtils.randFloat(0, 1);
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <Button
          style={styles.button}
          onPress={() => this.setState({mocking: !this.state.mocking})}
        >
          {this.state.mocking ? "Stop Mock" : "Mock"}
        </Button>
        <GLView
          style={{ flex: 1 }}
          onContextCreate={this.onContextCreate}
          onStartShouldSetResponder={(event) => true}
          onResponderGrant={(event) => this.touchStart(event)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: '50%',
    position: 'absolute',
    left: '25%',
    bottom: '1%',
    zIndex: 999
  }
});

AppRegistry.registerComponent("FreeMode", () => FreeMode);
