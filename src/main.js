import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';
import { loadBirds } from './demo/birds-1';

const clock = new THREE.Clock();

let camera, scene, renderer, stats, gui, settings = {};
let birds = [];
let ambientLight, spotLight;

async function init() {
  // 场景
  scene = new THREE.Scene();

  // 加载鸟类模型
  birds = await loadBirds();
  scene.add(...birds);

  // 相机
  camera = new THREE.PerspectiveCamera(
    80, // 视野角度
    window.innerWidth / window.innerHeight, // 长宽比
    0.1, // 近截面（near）
    900 // 远截面（far）
  );
  camera.position.set(150, 100, 0);  // 设置摄像机在鸟的侧面
  camera.lookAt(0, 90, 0);

  // 光源
  ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  // 调整后的点光源
  spotLight = new THREE.SpotLight(0xffffff, 1); // 设置为白色光
  spotLight.decay = 0.3; // 衰减
  spotLight.angle = Math.PI / 5; // 聚光灯的光束角度
  spotLight.position.set(15, 20, 0); // 位置
  spotLight.penumbra = 0.3; // 半影
  spotLight.castShadow = true; // 光源的阴影投射
  scene.add(spotLight);

  // 渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  // 获取你屏幕对应的设备像素比.devicePixelRatio告诉threejs,以免渲染模糊问题
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  //renderer.render(scene, camera);
  // 阴影 渲染器打开阴影的渲染
  renderer.shadowMap.enabled = true;
  // 背景颜色
  renderer.setClearColor(0x87CEEB, 1);
  document.body.appendChild(renderer.domElement);

  // 窗口调整
  window.onresize = onWindowResize;

  initHelper();
  initGUI();

  // 开始动画循环
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  const delta = clock.getDelta();
  birds.forEach(bird => bird.tick(delta));
  stats.update();
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix();
}

function initHelper() {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // 启用阻尼效果
  controls.dampingFactor = 0.25; // 阻尼系数
  controls.screenSpacePanning = false;
  controls.maxPolarAngle = Math.PI / 2;

  controls.addEventListener('change', () => {
    renderer.render(scene, camera);
  });

  // 创建stats对象
  stats = new Stats();
  document.body.appendChild(stats.domElement);
}

function initGUI() {
  gui = new GUI();
  
  const cameraFolder = gui.addFolder('Camera');
  cameraFolder.add(camera.position, 'x', -500, 500).name('Camera X');
  cameraFolder.add(camera.position, 'y', -500, 500).name('Camera Y');
  cameraFolder.add(camera.position, 'z', -500, 500).name('Camera Z');
  cameraFolder.open();
  
  const ambientLightFolder = gui.addFolder('Ambient Light');
  ambientLightFolder.add(ambientLight, 'intensity', 0, 2).name('Intensity');
  ambientLightFolder.open();

  const spotLightFolder = gui.addFolder('Spot Light');
  spotLightFolder.add(spotLight, 'intensity', 0, 2).name('Intensity');
  spotLightFolder.add(spotLight.position, 'x', -100, 100).name('Position X');
  spotLightFolder.add(spotLight.position, 'y', -100, 100).name('Position Y');
  spotLightFolder.add(spotLight.position, 'z', -100, 100).name('Position Z');
  spotLightFolder.open();
}

init();
