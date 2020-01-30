// @flow

import React, { PureComponent } from 'react';
import { AppRegistry, PixelRatio } from 'react-native';
import { GLView } from 'expo-gl';
import {
  AmbientLight, AnimationMixer,
  BoxBufferGeometry, Clock,
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Raycaster,
  Scene,
  SpotLight,
  Vector2,
  AnimationClip
} from 'three';
import Renderer from 'expo-three/build/Renderer';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Asset } from 'expo-asset';

export default class FreeMode extends PureComponent {
  timeout: any;
  cubes: [] = [];
  raycaster = new Raycaster();
  pixelRatio = PixelRatio.get();
  clock = new Clock();
  mixer: any;

  constructor() {
    super();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  update() {
    this.cubes.forEach((cube) => {
      // cube.rotation.y += 0.05;
      // cube.rotation.x += 0.025;
      // cube.rotation.z += 0.025;
      if(this.mixer) {
        this.mixer.update(this.clock.getDelta());
      }
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
    this.grid = new GridHelper(10, 10);
    scene.add(this.grid);

    const ambientLight = new AmbientLight(0x101010);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);

    const spotLight = new SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 500, 100);
    spotLight.lookAt(scene.position);
    scene.add(spotLight);

    // const cube = new IconMesh();
    // scene.add(cube);
    // this.cubes.push(cube);
    //
    // camera.lookAt(cube.position);

    const MODEL_PATH = Asset.fromModule(require('@assets/models/RiggedHand.glb')).uri;

    let loader = new GLTFLoader();
    loader.load(
      MODEL_PATH,
      (gltf) => {
        // A lot is going to happen here
        let model = gltf.scene;
        let fileAnimations = gltf.animations;
        console.log(fileAnimations);
        scene.add(model);
        model.traverse(o => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
          }
        });

        model.scale.set(1, 1, 1);
        model.rotation.y += 3.14;
        // model.rotation.x += 1.5;
        this.cubes.push(model);
        camera.lookAt(model.position);

        this.mixer = new AnimationMixer(model);
        let anim = AnimationClip.findByName(fileAnimations, 'index');
        let clip = this.mixer.clipAction(anim);
        clip.play();
      },
      undefined, // We don't need this function
      function(error) {
        console.log(error);
        console.error(error);
      }
    );

    // Setup an animation loop
    const render = () => {
      this.timeout = requestAnimationFrame(render);
      this.update();
      renderer.render(scene, camera);
      gl.endFrameEXP(); //todo investigate
    };
    render();
  };

  touchStart(event: SyntheticEvent) {
    let position = new Vector2();
    position.x = (event.nativeEvent.pageX * this.pixelRatio / this.renderer.domElement.width) * 2 - 1;
    position.y = - (event.nativeEvent.pageY * this.pixelRatio / this.renderer.domElement.height) * 2 + 1;
    console.log(event.nativeEvent.touches[0].touches);
    console.log(position);
    this.raycaster.setFromCamera( position, this.camera );
    let cubeIntersect = this.raycaster.intersectObjects( this.cubes );
    if (cubeIntersect.length > 0) {
      for ( let i = 0; i < cubeIntersect.length; i++ ) {
        console.log("intersect");
        let color = cubeIntersect[ i ].object.material.color;
        color.r = Math.random();
        color.g = Math.random();
        color.b = Math.random();
      }
    } else {
      let gridIntersect = this.raycaster.intersectObject(this.grid);
      for( let i = 0; i < gridIntersect.length; i++ ) {
        const cube = new IconMesh();

        cube.position.copy( gridIntersect[i].point );
        this.scene.add(cube);
        this.cubes.push(cube);
      }
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
