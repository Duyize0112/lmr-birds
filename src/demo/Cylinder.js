import *as THREE from 'three';

const geometry = new THREE.CylinderGeometry( 5, 5, 2, 32 );
const material = new THREE.MeshPhongMaterial( {color: 0xffff00} );
const cylinder = new THREE.Mesh( geometry, material );

cylinder.castShadow=true
export default cylinder