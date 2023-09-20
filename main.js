
//INITIAL SETUP CODE

import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(-3, 8, 30);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


//control system
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const controls = new OrbitControls(camera, renderer.domElement);


//lights

const ambientLight1 = new THREE.AmbientLight(0xead6b8, 2);
const ambientLight2 = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight1);

scene.add(ambientLight2);



//END INITIAL SETUP CODE - output should be a  black screen now. 



//ADDING THE STARS BACKGROUND

import starTexture from './public/assests/stars.jpg';

const cubeTextureLoader = new THREE.CubeTextureLoader();

scene.background = cubeTextureLoader.load([
  starTexture,
  starTexture,
  starTexture,
  starTexture,
  starTexture,
  starTexture
])

//Now there should be stars present in the background. and the screen can be dragged into place


//ADDING SATURN

const saturnTexture = new THREE.TextureLoader().load('assests/saturn.jpg');

const normalTexture = new THREE.TextureLoader().load('assests/saturn_normalMap.jpg');

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ //surface appearance
    map: saturnTexture,
    normalMap: normalTexture
  })

);

scene.add(saturn); //saturn is now visible in the center of the screen




//ADDING SATURN'S RINGS

const ringTexture = new THREE.TextureLoader().load('assests/saturn ring.png');


const ring = new THREE.Mesh(
  new THREE.RingGeometry(5, 9, 32),
  new THREE.MeshStandardMaterial({
    map: ringTexture,
    side: THREE.DoubleSide // THREE.DoubleSide: This value indicates that the material should be applied to both the front and back faces of the geometry.
  })
);

ring.rotation.x = 1.5;

scene.add(ring);


//Now the rings should be visible around saturn

//ADDING THE SUN

const sunTexture = new THREE.TextureLoader().load('assests/sun.jpg');
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture
  })
);

sun.position.x = -40;
sun.position.y = 0;
sun.position.z = -40;
scene.add(sun);


//ADD A LIGHT FROM SUN TO SATURN

const directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
directionalLight.position.set( sun.position.x, sun.position.y, sun.position.z );
scene.add( directionalLight );




//ADDING SATURN MOONS

//TITAN
const titanTexture = new THREE.TextureLoader().load('./public/assests/titan.jpg');
const titan = new THREE.Mesh(
  new THREE.SphereGeometry(0.8, 32, 32),
  new THREE.MeshStandardMaterial({
    map: titanTexture
  })
);

titan.position.x = 10;
titan.position.y = 0;
titan.position.z = 0;

//titan object is created to seperate the rotation from the saturn object
const titanObj = new THREE.Object3D();
titanObj.add(titan);
scene.add(titanObj);


//ENCALADUS
const encTexture = new THREE.TextureLoader().load('./public/assests/enc.jpg');
const enc = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: encTexture
  })
);

enc.position.x = 8;
enc.position.y = 3;
enc.position.z = 0;

saturn.add(enc);

//ADDING MIMAS MOON

const mimasTexture = new THREE.TextureLoader().load('./public/assests/mimas.png');
const mimas = new THREE.Mesh(
  new THREE.SphereGeometry(0.3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: mimasTexture
  })
);

const mimasObj = new THREE.Object3D();
mimasObj.add(mimas);
scene.add(mimasObj);

mimas.position.x = 8;
mimas.position.y = 4;
mimas.position.z = 0;

//ANIMATE FUNCTION

function animate() {

  renderer.render(scene, camera);

  controls.update();

  saturn.rotation.y += 0.002;
  titanObj.rotateY(0.004);
  titan.rotateY(0.04);

  mimasObj.rotateY(0.001);
  mimasObj.rotateZ(0.0001);
  mimas.rotateY(0.01);

  enc.rotateY(0.01);

  ring.rotateZ(-0.001);

  sun.rotation.y += 0.001;

  // Move and remove shooting star

}

renderer.setAnimationLoop(animate);



