import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function setupModel(data) {
    const model = data.scene.children[0];
    const clip = data.animations[0];
    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.play();
    model.tick = (delta) => mixer.update(delta);
    return model;
}

const loader = new GLTFLoader();

async function loadBirds() {
    const [parrotData, flamingoData, storkData] = await Promise.all([
        loader.loadAsync('./src/assets/models/Parrot.glb'),
        loader.loadAsync('./src/assets/models/Flamingo.glb'),
        loader.loadAsync('./src/assets/models/Stork.glb'),
    ]);

    const parrot = setupModel(parrotData);
    parrot.position.set(40, 70, 0);

    const flamingo = setupModel(flamingoData);
    flamingo.position.set(-80, 80, 80);

    const stork = setupModel(storkData);
    
    // 设置阴影效果
    parrot.castShadow = true;
    flamingo.castShadow = true;
    stork.castShadow = true;

    return [parrot, flamingo, stork];
}

export { loadBirds };
