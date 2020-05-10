import * as THREE from "three";
import CubeImage from "../assets/uv_test_bw.png";

let container;
let camera;
let renderer;
let scene;
let mesh;

function init() {
  container = document.querySelector("#scene-container");

  scene = new THREE.Scene();

  scene.background = new THREE.Color("#eceff1");

  // set up the options for a perspective camera
  const fov = 35; // fov = Field Of View
  const aspect = container.clientWidth / container.clientHeight;

  const near = 0.1;
  const far = 100;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.set(0, 0, 10);

  const geometry = new THREE.BoxBufferGeometry(2, 2, 2);

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(CubeImage);

  texture.encoding = THREE.sRGBEncoding;
  texture.anisotropy = 16;

  const material = new THREE.MeshStandardMaterial({
    map: texture
  });

  // create a Mesh containing the geometry and material
  mesh = new THREE.Mesh(geometry, material);

  // add the mesh to the scene object
  scene.add(mesh);

  // Create a directional light
  const light = new THREE.DirectionalLight(0xffffff, 3.0);

  // move the light back and up a bit
  light.position.set(10, 10, 10);

  // remember to add the light to the scene
  scene.add(light);

  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);

  renderer.setPixelRatio(window.devicePixelRatio);

  // set the gamma correction so that output colors look
  // correct on our screens
  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;
  // add the automatically created <canvas> element to the page

  container.appendChild(renderer.domElement);
  function update() {
    // increase the mesh's rotation each frame
    mesh.rotation.z += 0.01;
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
  }

  function render() {
    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(() => {
    update();
    render();
  });
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
