import * as THREE from "three";
import {OrbitControls} from "jsm/controls/OrbitControls.js";
import getStarfield from "./src/getStarfield.js";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov,aspect,near, far);

camera.position.z = 5;

const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.dampingFactor = 0.03;
const geo = new THREE.IcosahedronGeometry(1.0,3);
const mat =  new THREE.MeshStandardMaterial(
    {
        color: 0xffffff,
        flatShading: true
    }
);
const mesh = new THREE.Mesh(geo,mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial(
    {
        color: 0xffffff,
        wireframe: true
    }
)
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.005)

mesh.add(wireMesh);

const stars = getStarfield({numStars: 2000});
scene.add(stars)

const sunLight = new THREE.DirectionalLight(0xff55f);
sunLight.position.set(2,52,2)

scene.add(sunLight)

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

function animate(t = 0){
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera);
    controls.update();
}

animate();
