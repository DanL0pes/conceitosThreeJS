import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Pegando a largura e altura da janela e criando o renderizador
const w = window.innerWidth
const h = window.innerHeight;
// Renderizador responsavel por criar o canvas e renderizar a cena 3d
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(w, h);
// atribuindo o renderizador ao body do html
document.body.appendChild(renderer.domElement);

// definindo o fov (campo de visao)
const fov = 75;
// definido o aspect ratio, que será a proporção da tela, no caso a largura dividida pela altura. ex: 16:9
const aspect = w / h;
// e aqui criando a camera de fato, que será como um ponto de vista da cena 3d, sendo o 3o paramentro o minimo de distancia que a camera enxerga e 4o parametro o maximo de distancia
const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 10);
// aqui se afasta um pouco a visão da camera para que o objeto fique visível
camera.position.z = 5;
// criando a cena onde serão adicionados os objetos 3d
const scene = new THREE.Scene();

// aqui temos o controls que é uma extensão do ThreeJS que serve para controlar a camera apartir do mouse
const controls = new OrbitControls(camera, renderer.domElement);
// o enableDamping serve para criar uma fluidez no movimento da camera com o mouse
controls.enableDamping = true;
// e o dampingFactor é o fator, ou seja, a intensidade da fluidez
controls.dampingFactor = 0.1;

// aqui estamos criando a base do coração que é um retangulo 3d
const geo = new THREE.BoxGeometry(2,2, 1);
// para isso é necessario definir tambem o material e a cor
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true,
});
// aqui estamos criando o mesh que é o objeto 3d composto pela geometria e o material
const heart = new THREE.Mesh(geo,mat);
heart.position.set(0, 0, 0);
heart.rotation.set(0, 0, 0.85);
scene.add(heart);

// e aqui temos as duas laterais do coração, que são retangulos 3d onde so mudamos a posição
const geoSide = new THREE.BoxGeometry(2,2, 1);
const leftSide = new THREE.Mesh(geoSide,mat);
leftSide.position.set(0, 1, 0);
heart.add(leftSide);
const rightSide = new THREE.Mesh(geoSide,mat);
rightSide.position.set(1, 0, 0);
heart.add(rightSide);

// aqui temos uma parte muito importante, que é a luz, sem ela o objeto 3d ficaria escuro e não veriamos
const light = new THREE.HemisphereLight( 0xff0000, 0x420000, 1 );
scene.add(light);

// e finalmente temos a renderização da cena, que cria os objetos 3d na tela utizando o canvas
renderer.render(scene, camera);

// aqui temos tambem uma parte muito importante, que é a animação do coração, que gira lentamente, e tambem da utilidade ao controls
function animate(t = 0){
    requestAnimationFrame(animate);
    heart.rotation.y = t * 0.0005;
    renderer.render(scene, camera);
    controls.update();
}
animate();