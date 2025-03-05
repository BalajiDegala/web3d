import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createCamera } from './components/camera.js';
import { createRenderer } from './components/renderer.js';
import { loadModel } from './components/loadModel.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'gsap/gsap-core';
import { GUI } from 'dat.gui';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = createCamera();
const renderer = createRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

controls.minDistance = 0.1
controls.maxDistance = 1
controls.minPolarAngle = -Math.PI / 2
controls.maxPolarAngle = Math.PI / 2
controls.minAzimuthAngle = -Math.PI / 6
controls.maxAzimuthAngle = Math.PI / 6

// Add lighting
const light = new THREE.DirectionalLight(0x589A8D, 1);
const al = new THREE.AmbientLight(0x8FC1B5, 0.1);
light.position.set(10, 10, 10);
scene.add(light);
scene.add(al)

const gltfloader = new GLTFLoader();
gltfloader.load('./src/assets/models/office.glb', (gltf) => 
  {
  const model = gltf.scene;

  model.position.set(0.1, -0.5, 0.1); // x, y, z coordinates
  model.rotation.y = 179; // Optional: Rotate the model
  model.scale.set(0.5, 0.5, 0.5); // Optional: Scale the model

  scene.add(model); 

})

function createTextMaterial(text, color, backgroundColor) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Set canvas size
  canvas.width = 256;
  canvas.height = 256;

  // Fill background color
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw text
  context.fillStyle = color;
  context.font = '30px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  // Create texture
  const texture = new THREE.CanvasTexture(canvas);
  return new THREE.MeshBasicMaterial({ map: texture });
}


// Raycaster and mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const ayon_geometry = new THREE.BoxGeometry(0.1,0.1,0.1);
const zulip_geometry = new THREE.BoxGeometry(0.1,0.1,0.1);

const ayonMaterial = createTextMaterial('Ayon', '#00ff00', '#000000');
const zulipMaterial = createTextMaterial('Zulip', '#ffffff', '#0000ff');
const ayon = new THREE.Mesh(ayon_geometry, ayonMaterial);
const zulip = new THREE.Mesh(zulip_geometry, zulipMaterial);

ayon.position.set(-0.18, 0.14, -0.65);
zulip.position.set(-0.38, 0.14, -0.65);

scene.add(ayon);
scene.add(zulip);


// Add click event listener
window.addEventListener('click', (event) => {
  // Convert mouse position to normalized device coordinates (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Set raycaster with the camera and mouse
  raycaster.setFromCamera(mouse, camera);

  // Check for intersections with ayon
  const ayon_intersects = raycaster.intersectObject(ayon);
  if (ayon_intersects.length > 0) {
    console.log('Ayon clicked!');

    // Perform action: Move camera to a new location
    gsap.to(camera.position, { 
      x: 10, 
      y: 10, 
      z: 10, 
      duration: 2, 
      onUpdate: () => camera.lookAt(ayon.position) 
    });

    // Navigate to localhost
    window.location.href = "http://www.facebook.com/";
    return; // Prevent further checks
  }

  // Check for intersections with zulip
  const zulip_intersects = raycaster.intersectObject(zulip);
  if (zulip_intersects.length > 0) {
    console.log('Zulip clicked!');

    // Perform action: Move camera to a different location
    gsap.to(camera.position, { 
      x: -10, 
      y: 10, 
      z: -10, 
      duration: 2, 
      onUpdate: () => camera.lookAt(zulip.position) 
    });

    // Navigate to Google
    window.location.href = "https://www.google.com/";
  }
});

  const pl = new THREE.PointLight(0x8FC1B5, 1, 2, 5);
  pl.position.set(0.8, 0.4, -0.8);
  scene.add(pl);


  const pl2 = new THREE.PointLight(0xe3832d, 6.25, 8, 2);
  pl2.position.set(-0.8, 1, -0.6);
  scene.add(pl2);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Append to DOM
document.getElementById('app').appendChild(renderer.domElement);
