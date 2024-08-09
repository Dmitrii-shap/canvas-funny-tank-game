import {MapElementTypes} from "../../enums/map-element-types";
import jungleImage from '../../../img/jungle.png'
import waterImage from '../../../img/water.jpg'
import brickImage from '../../../img/brick.jpg'
import sandImage from '../../../img/sand.jpg'


const getImage = (src: string) => {
    const image = new Image();
    image.src = src;

    return image;
}

export const mapElementDraw = {
    empty: {
        id: MapElementTypes.Empty,
        fill: '#000'
    },
    brick: {
        id:  MapElementTypes.Brick,
        fill: '#FFA500',
        texture: getImage(brickImage),
    },
    sand: {
        id:  MapElementTypes.Sand,
        fill: '#ffe6e3',
        texture: getImage(sandImage),
    },
    water: {
        id:  MapElementTypes.Water,
        fill: '#2EC2FF',
        texture: getImage(waterImage),
    },
    tree: {
        id:  MapElementTypes.Tree,
        fill: '#000',
        texture: getImage(jungleImage),
    }
};
