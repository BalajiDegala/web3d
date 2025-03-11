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
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
camera.position.set(0.7, 0.6, 1).setLength(15);
const renderer = createRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
let ayon, zulip, space


// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
const al = new THREE.AmbientLight(0xffffff, 0.1);
light.position.set(10, 10, 10);
scene.add(light);
scene.add(al)

const gltfloader = new GLTFLoader();
gltfloader.load('./src/assets/models/space_boi.glb', (gltf) => 
  {
  const model = gltf.scene;

  model.position.set(0.1, -0.1, 0.1); 
  model.scale.set(1, 1, 1);

  scene.add(model); 

})




const gltfloader1 = new GLTFLoader();
gltfloader1.load('./src/assets/models/zulip.glb', (gltf) => {
  zulip = gltf.scene; // Assign to global variable
  zulip.position.set(5, 4, 0);
  zulip.rotation.y = 0.6;
  zulip.scale.set(1, 1, 1);
  scene.add(zulip);
});

const gltfloader2 = new GLTFLoader();
gltfloader2.load('./src/assets/models/ayon.glb', (gltf) => {
  ayon = gltf.scene; // Assign to global variable
  ayon.position.set(-2, 2, 6);
  ayon.rotation.y = 0.7;
  ayon.scale.set(1, 1, 1);
  scene.add(ayon);
});

const gltfloader3 = new GLTFLoader();
gltfloader3.load('./src/assets/models/space.glb', (gltf) => {
  space = gltf.scene; // Assign to global variable
  space.position.set(3.5, 4, 7);
  space.rotation.y = 0.7;
  space.scale.set(1, 1, 1);
  scene.add(space);
});


// Raycaster and mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // Check if objects are loaded and intersected
  if (ayon) {
    const ayon_intersects = raycaster.intersectObject(ayon, true);
    if (ayon_intersects.length > 0) {
      console.log('Ayon clicked!');
      gsap.to(camera.position, { 
        x: -10, 
        y: 10, 
        z: -10, 
        duration: 2, 
        onUpdate: () => camera.lookAt(ayon.position) 
      });
      window.location.href = "http://localhost:30008";
      return; 
    }
  }

  if (zulip) {
    const zulip_intersects = raycaster.intersectObject(zulip, true);
    if (zulip_intersects.length > 0) {
      console.log('Zulip clicked!');
      gsap.to(camera.position, { 
        x: -10, 
        y: 10, 
        z: -10, 
        duration: 2, 
        onUpdate: () => camera.lookAt(zulip.position) 
      });
      window.location.href = "https://ddhb.zulipchat.com/";
    }
  }

  if (space) {
    const space_intersects = raycaster.intersectObject(space, true);
    if  (space_intersects.length > 0) {
      console.log('Space clicked!');
      gsap.to(camera.position, { 
        x: -10, 
        y: 10, 
        z: -10, 
        duration: 2, 
        onUpdate: () => camera.lookAt(space.position) 
      });
      window.location.href = "http://127.0.0.1:8000";
    }
  }
});


  const pl = new THREE.DirectionalLight(0xffffff, 100, 2, 5);
  pl.position.set(0.8, 0.4, -0.8);
  scene.add(pl);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

document.getElementById('app').appendChild(renderer.domElement);
