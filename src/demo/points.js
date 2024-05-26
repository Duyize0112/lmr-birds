import *as THREE from 'three';


//贴图
// function getTexture(){
//     var texture=new THREE.TextureLoader().load('./src/assets/tl.webp');
//     return texture;
// }

const vertices = new Float32Array([
    -10,-10,10,
    10,-10,10,
    10,10,10,
    -10,10,10,
]);

const sphere=new THREE.SphereGeometry(50)
const cube=new THREE.BoxGeometry(100,100,100,10,10,10)
console.log('SPHERE-->',sphere, )
console.log('cube-->',cube)

const geometry=new THREE.BufferGeometry();
//geometry.setAttribute("position",new THREE.BufferAttribute(vertices,3))
geometry.setAttribute("position",cube.getAttribute('position'))



const material=new THREE.PointsMaterial({
    // color:0x87CEFA,
    //color:0xff0000,//红色
    color:0x00ffff,//青色
    //map:getTexture(),
    size:1,
    transparent:true,
    blending:THREE.NormalBlending,
    opacity:0.5,

})
const points=new THREE.Points(geometry,material)

export default points