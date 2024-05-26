import *as THREE from 'three';

function getTexture(){
    var texture=new THREE.TextureLoader().load('./src/assets/tl.webp');
    return texture;
}

const material=new THREE.SpriteMaterial({
    //color:0xff0000
    rotation:Math.PI/4,
    map:getTexture(),
    transparent:true,
    blending:THREE.NormalBlending
})

const sprite=new THREE.Sprite(material)
console.log('sprite-->',sprite)

sprite.scale.set(10,10)
sprite.position.set(20,20,20)

export default sprite
