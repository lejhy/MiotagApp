// @flow

import React, { PureComponent } from 'react';
import { AppRegistry, PixelRatio, StyleSheet, View } from 'react-native';
import { GLView } from 'expo-gl';
import {
  AmbientLight,
  Fog,
  GridHelper,
  Math,
  MeshPhongMaterial,
  PerspectiveCamera,
  PointLight,
  Raycaster,
  Scene,
  SkinnedMesh,
  SpotLight,
  Vector2,
  Vector3,
} from 'three';
import Renderer from 'expo-three/build/Renderer';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Asset } from 'expo-asset';
import Button from '@core/Button/Button';

export default class FreeMode extends PureComponent {
  renderer: Renderer;
  camera: PerspectiveCamera;
  scene: Scene;

  loaded = false;

  state = {
    mocking: false
  };

  timeout: any;
  raycaster = new Raycaster();
  pixelRatio = PixelRatio.get();

  grid: GridHelper;
  handScene: any;
  handMesh: SkinnedMesh;
  fingers = [[],[],[],[],[]];

  values = [0,0,0,0,0];

  mockState = [0.05, 0.04, 0.03, 0.02, 0.01];
  mockValues() {
    for(let i = 0; i < 5; i++) {
      if(this.values[i] > 1 || this.values[i] < 0) {
        this.mockState[i] *= -1;
      }
      this.values[i] += this.mockState[i];
    }
  }

  constructor() {
    super();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  update() {
    if (this.loaded) {
      this.handScene.rotation.y += 0.025;

      for(let i = 0; i < 5; i++) {
        let rotation = this.values[i] * Math.degToRad(-90);
        this.fingers[i][1].rotation.z = rotation;
        this.fingers[i][2].rotation.z = rotation;
      }
    }
    if (this.state.mocking) {
      this.mockValues();
    }
  }

  onContextCreate = gl => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = 0x101010;

    // Create a WebGLRenderer without a DOM element
    this.renderer = new Renderer({ gl });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(sceneColor);

    this.camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
    this.camera.position.set(0, 2, 4);
    this.camera.lookAt(new Vector3(0, 1.5, 0));


    this.scene = new Scene();
    this.scene.fog = new Fog(sceneColor, 1, 10000);
    this.grid = new GridHelper(50, 50);
    this.scene.add(this.grid);

    const ambientLight = new AmbientLight(0x101010);
    this.scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    this.scene.add(pointLight);

    const spotLight = new SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 500, 100);
    spotLight.lookAt(this.scene.position);
    this.scene.add(spotLight);

    const MODEL_PATH = Asset.fromModule(require('@assets/models/RiggedHand.glb')).uri;

    let loader = new GLTFLoader();
    loader.load(
      MODEL_PATH,
      (gltf) => {
        let model = gltf.scene;
        this.scene.add(model);
        this.handScene = model;
        model.traverse(o => {
          if (o.isBone) {
            switch (o.name.slice(0, o.name.length - 1)) {
              case "Thumb":
                this.fingers[0].push(o);
                break;
              case "Index":
                this.fingers[1].push(o);
                break;
              case "Middle":
                this.fingers[2].push(o);
                break;
              case "Ring":
                this.fingers[3].push(o);
                break;
              case "Pinkie":
                this.fingers[4].push(o);
                break;
            }
          } else if (o.isMesh) {

          }
          if (o.type === "SkinnedMesh") {
            console.log(o);
            this.handMesh = o;
            o.material = new MeshPhongMaterial({
              color: 0xff0000,
              skinning: true
            });
          }
        });

        model.rotation.y += Math.degToRad(180);

        this.loaded = true

      },
      (xhr) => {
          if(xhr.lengthConputable) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          } else {
            console.log(xhr.loaded + ' loaded');
          }
      },
      (error) => {
        console.log(error);
        console.error(error);
      }
    );

    // Setup an animation loop
    const render = () => {
      this.timeout = requestAnimationFrame(render);
      this.update();
      this.renderer.render(this.scene, this.camera);
      gl.endFrameEXP();
    };
    render();
  };

  touchStart(event: SyntheticEvent) {
    let position = new Vector2();
    position.x = (event.nativeEvent.pageX * this.pixelRatio / this.renderer.domElement.width) * 2 - 1;
    position.y = - (event.nativeEvent.pageY * this.pixelRatio / this.renderer.domElement.height) * 2 + 1;

    this.raycaster.setFromCamera( position, this.camera );
    let handIntersects = this.raycaster.intersectObjects( [this.handMesh] );
    if (handIntersects.length > 0) {
      let color = this.handMesh.material.color;
      color.r = Math.randFloat(0, 1);
      color.g = Math.randFloat(0, 1);
      color.b = Math.randFloat(0, 1);
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
    zIndex: 999
  }
});

AppRegistry.registerComponent("FreeMode", () => FreeMode);
