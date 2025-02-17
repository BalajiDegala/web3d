import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createCamera } from './components/camera.js';
import { createRenderer } from './components/renderer.js';
import { loadModel } from './components/loadModel.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xabcdef);
const camera = createCamera();
camera.position.set(-0.5,0.25,-0.1)
const renderer = createRenderer();
const controls = new OrbitControls(camera, renderer.domElement);


// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
const al = new THREE.AmbientLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);
scene.add(al)

const gltfloader = new GLTFLoader();
gltfloader.load('./src/assets/models/office.glb', (gltf) => 
  {
  const model = gltf.scene;

  model.position.set(-0.5, -0.5, -0.1); // x, y, z coordinates
  model.rotation.y = Math.PI / 4; // Optional: Rotate the model
  model.scale.set(0.5, 0.5, 0.5); // Optional: Scale the model

  scene.add(model); 

})



// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Append to DOM
document.getElementById('app').appendChild(renderer.domElement);
