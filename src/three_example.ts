import * as THREE from 'three'

const scene = new THREE.Scene();
const sizes = { width: window.innerWidth, height: window.innerHeight }

const points = [
  new THREE.Vector2(-.8, -.8),
  new THREE.Vector2(0, -.8),
  new THREE.Vector2(-.8, .8),
]
const shape = new THREE.Shape(points);

const triangle = new THREE.ShapeGeometry(shape);
const plane = new THREE.Mesh(
  triangle,
  new THREE.MeshBasicMaterial({ color: '#00ddb8' })
)
scene.add(plane)

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 4

const canvas = document.getElementById('renderer') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setClearColor('#02142d')
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)