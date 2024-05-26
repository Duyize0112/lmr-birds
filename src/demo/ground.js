import *as THREE from 'three';

const geometry=new THREE.PlaneGeometry(5000,5000);
const material = new THREE.MeshLambertMaterial({
        color:0xffffff,
    });
const mesh=new THREE.Mesh(geometry,material);
mesh.rotateX(-Math.PI/2)
mesh.position.set(0,-20,0)

mesh.receiveShadow = true;//允许接收阴影
export default mesh;