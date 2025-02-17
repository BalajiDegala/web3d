import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadModel(path, scene) {
  const loader = new GLTFLoader();
  loader.load(
    path,
    (gltf) => {
      scene.add(gltf.scene);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
      console.error('An error occurred while loading the model', error);
    }
  );
}
