import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createCamera } from './components/camera.js';
import { createRenderer } from './components/renderer.js';
import { loadModel } from './components/loadModel.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'gsap/gsap-core';
import { GUI } from 'dat.gui';

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

// Raycaster and mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const geometry = new THREE.BoxGeometry(0.12,0.19,0.1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0});
const tasks = new THREE.Mesh(geometry, material);
tasks.position.set(-0.18, 0.14, -0.65);
scene.add(tasks);

// Add click event listener
window.addEventListener('click', (event) => {
  // Convert mouse position to normalized device coordinates (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Set raycaster with the camera and mouse
  raycaster.setFromCamera(mouse, camera);

  // Check for intersections
  const intersects = raycaster.intersectObject(tasks);

  if (intersects.length > 0) {
    console.log('tasks clicked!');

    // Perform action: Move camera to a new location
    gsap.to(camera.position, { 
      x: 10, 
      y: 10, 
      z: 10, 
      duration: 2, 
      onUpdate: () => camera.lookAt(tasks.position) 
    });

    // Or navigate to another URL
    window.location.href = "http://localhost:5173/";
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
