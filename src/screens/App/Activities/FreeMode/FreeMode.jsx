// @flow

import React, { PureComponent } from 'react';
import { AppRegistry, PixelRatio } from 'react-native';
import { GLView } from 'expo-gl';
import {
  AmbientLight,
  BoxBufferGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Raycaster,
  Scene,
  SpotLight,
  Vector2
} from 'three';
import Renderer from 'expo-three/build/Renderer';

export default class FreeMode extends PureComponent {
  timeout: any;
  entities: [] = [];
  raycaster = new Raycaster();
  pixelRatio = PixelRatio.get();

  constructor() {
    super();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  update() {
    this.entities.forEach((cube) => {
      cube.rotation.y += 0.05;
      cube.rotation.x += 0.025;
    });
  }

  onContextCreate = gl => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = 0x6ad6f0;

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    this.renderer = renderer;
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);

    const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
    this.camera = camera;
    camera.position.set(2, 5, 5);

    const scene = new Scene();
    this.scene = scene;
    scene.fog = new Fog(sceneColor, 1, 10000);
    scene.add(new GridHelper(10, 10));

    const ambientLight = new AmbientLight(0x101010);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);

    const spotLight = new SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 500, 100);
    spotLight.lookAt(scene.position);
    scene.add(spotLight);

    const cube = new IconMesh();
    scene.add(cube);
    this.entities.push(cube);

    camera.lookAt(cube.position);

    // Setup an animation loop
    const render = () => {
      this.timeout = requestAnimationFrame(render);
      this.update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  touchStart(event: SyntheticEvent) {
    let position = new Vector2();
    position.x = (event.nativeEvent.pageX * this.pixelRatio / this.renderer.domElement.width) * 2 - 1;
    position.y = (event.nativeEvent.pageY * this.pixelRatio / this.renderer.domElement.height) * 2 - 1;
    console.log(event.nativeEvent.touches[0].touches);
    console.log(position);
    this.raycaster.setFromCamera( position, this.camera );
    let intersects = this.raycaster.intersectObjects( this.scene.children );
    for ( let i = 0; i < intersects.length; i++ ) {
      console.log("intersect");
      let color = intersects[ i ].object.material.color;
      color.r = Math.random();
      color.g = Math.random();
      color.b = Math.random();
    }
  }

  render() {
    return(
      <GLView
        style={{ flex: 1 }}
        onContextCreate={this.onContextCreate}
        onStartShouldSetResponder={(event) => true}
        onResponderGrant={(event) => this.touchStart(event)}
      />
    )
  }
}

class IconMesh extends Mesh {
  constructor() {
    super(
      new BoxBufferGeometry(1.0, 1.0, 1.0),
      new MeshStandardMaterial({
        // map: new TextureLoader().load(require('./assets/icon.png')),
        color: 0xff0000
      }),
    );
  }
}

AppRegistry.registerComponent("FreeMode", () => FreeMode);
