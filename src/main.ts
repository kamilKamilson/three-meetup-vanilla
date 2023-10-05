import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene();

const material = new THREE.MeshBasicMaterial({ color: "#ff0000" });
const geometry = new THREE.BoxGeometry(1, 1, 1);
const box = new THREE.Mesh(geometry, material)
scene.add(box)

const sizes = { width: window.innerWidth, height: window.innerHeight }

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 6

const canvas = document.getElementById('renderer') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock()

const tick = () => {

  //Simple animation
  // const elapsedTime = clock.getElapsedTime();
  // box.position.x = Math.sin(elapsedTime)
  // box.position.y = Math.cos(elapsedTime)

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()