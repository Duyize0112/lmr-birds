import *as THREE from 'three';

const geometry=new THREE.BoxGeometry(10,10,10);
const material=new THREE.MeshBasicMaterial({
    color:0x00ff00,
   // transparent:true,
    opacity:0.5
})
const mesh=new THREE.Mesh(geometry,material);
export default mesh;