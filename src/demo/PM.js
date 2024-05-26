import *as THREE from 'three';

const vertices = [];
for (let i = 0; i < 2000; i++) {
    const x = Math.random() * 20001000;
    const y = Math.random() * 20001000;
    const z = Math.random() * 20001000;
    vertices.push(x, y, z);
}

const sphere=new THREE.SphereGeometry(50)
console.log('SPHERE-->',sphere, )

const geometry=new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
//geometry.setAttribute("position",new THREE.BufferAttribute(vertices,3))
//立方体
//geometry.setAttribute("position",cube.getAttribute('position'))
//球形几何体
//geometry.setAttribute("position",sphere.getAttribute('position'))

const positions = geometry.getAttribute('position');
for (let i = 0; i < positions.count; i++) {
    // 随机生成新顶点的位置
    const randomVector = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
    // 添加新顶点的位置到 BufferGeometry 中
    positions.setXYZ(i, randomVector.x * 50, randomVector.y * 50, randomVector.z * 50);
}

const material=new THREE.PointsMaterial({
    color:0x87CEFA,
    size:1,
    transparent:true,
    blending:THREE.NormalBlending,
    opacity:0.5,

})
const points=new THREE.Points(geometry,material)

export default points