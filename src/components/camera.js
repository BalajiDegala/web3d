import * as THREE from 'three';

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    55, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near plane
    200 // Far plane

  );

  camera.position.set(0.3,0.1,0.6)


  return camera;
}
