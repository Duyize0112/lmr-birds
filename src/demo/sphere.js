import *as THREE from 'three';
const texLoader = new THREE.TextureLoader();
const texture = texLoader.load('./src/assets/earth.jpg');
const textureCube = new THREE.CubeTextureLoader().setPath('../src/assets/env/').load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);

const geometry=new THREE.SphereGeometry(30);
const material=new THREE.MeshBasicMaterial({
    map:texture,
    //color:0xff0000
    transparent:true,
    envMap:textureCube,
    opacity:0.5
})
const mesh=new THREE.Mesh(geometry,material);
export default mesh;