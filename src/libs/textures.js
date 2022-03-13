
import { TextureLoader } from 'three';

// Texture
import grassTexture from '../texture/grass.jpg';
import brickTexture from '../texture/brick.jpg';
import woodTexture from '../texture/wood.jpg';

// Material
const grassMaterial = new TextureLoader().load(grassTexture);
const brickMaterial = new TextureLoader().load(brickTexture);
const woodMaterial = new TextureLoader().load(woodTexture);

export {
    grassMaterial as grass,
    brickMaterial as brick,
    woodMaterial as wood
}
