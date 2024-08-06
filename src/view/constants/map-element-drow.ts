import {MapElementTypes} from "../../enums/map-element-types";

// Тут будет Текстурки
export const mapElementDrow = {
    empty: {
        id: MapElementTypes.Empty,
        fill: '#000'
    },
    brick: {
        id:  MapElementTypes.Brick,
        fill: '#FFA500'
    },
    block: {
        id:  MapElementTypes.Sand,
        fill: '#ffe6e3'
    },
    water: {
        id:  MapElementTypes.Water,
        fill: '#2EC2FF'
    },
    tree: {
        id:  MapElementTypes.Tree,
        fill: 'rgba(0,128,0,0.5)'
    }
};
