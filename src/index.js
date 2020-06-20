import * as THREE from "three";
import CubeImage from "../assets/texture.jpg";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let container;
let camera;
let renderer;
let scene;
let mesh;
let controls;

function init() {
  container = document.querySelector( '#scene-container' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( "#eceff1" );

  createCamera();
  createLights();
  createMeshes();
  createRenderer();
  createControls();

  renderer.setAnimationLoop( () => {
    update();
    render();
  } );
}

function update() {
  // increase the mesh's rotation each frame
  // Uncomment below lines to see the rotation
  mesh.rotation.z += 0.01;
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
}

function render() {
  renderer.render(scene, camera);
}

function createCamera() {
  camera = new THREE.PerspectiveCamera(
    35, // FOV
    container.clientWidth / container.clientHeight, // aspect
    0.1, // near clipping plane
    100, // far clipping plane
  );

  camera.position.set( -4, 4, 10 );
}

function createLights() {
  const ambientLight = new THREE.HemisphereLight(
    0xddeeff, // sky color
    0x202020, // ground color
    2, // intensity
  );

  const mainLight = new THREE.DirectionalLight( 0xffffff, 2 );

  mainLight.position.set( 10, 10, 10 );

  scene.add( ambientLight, mainLight );
}

function createMeshes() {
  const geometry = new THREE.BoxBufferGeometry( 2, 2, 2 );

  const textureLoader = new THREE.TextureLoader();

  const texture = textureLoader.load(CubeImage);

  texture.encoding = THREE.sRGBEncoding;
  texture.anisotropy = 16;

  const material = new THREE.MeshStandardMaterial( {
    map: texture,
  } );

  mesh = new THREE.Mesh( geometry, material );

  scene.add( mesh );
}

function createRenderer() {
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  container.appendChild( renderer.domElement );
}

function createControls() {
  controls = new OrbitControls( camera, container );
}

function onWindowResize() {
  // set the aspect ratio to match the new browser window aspect ratio
  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  // update the size of the renderer AND the canvas
  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

// call the init function to set everything up
init();
