import * as THREE from 'three';

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    75, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near plane
    1000 // Far plane
  );
  camera.position.set(0, 1, 5); // Position the camera
  return camera;
}
