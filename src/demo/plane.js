import *as THREE from 'three';

const texLoader = new THREE.TextureLoader();
const texture = texLoader.load('./src/assets/earth.jpg');

const geometry=new THREE.PlaneGeometry(100,50);
const material = new THREE.MeshLambertMaterial({
        map: texture,
    });

    /*纹理坐标0~1之间随意定义*/
    const uvs=new Float32Array([
        0,0,
        1,0,
        1,1,
        0,1,
    ]);
    //设置几何体attributes属性的位置normal属性
    geometry.attributes.uv=new THREE.BufferAttribute(uvs,2);
console.log('uv',geometry.attributes.uv);
const mesh=new THREE.Mesh(geometry,material);

export default mesh;