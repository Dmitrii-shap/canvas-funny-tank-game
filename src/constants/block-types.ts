import {MapElementTypes} from "../enums/map-element-types";

export const canTankMoveMapElements = new Set<MapElementTypes>([MapElementTypes.Empty, MapElementTypes.Tree, MapElementTypes.Sand]);

export const canBulletMoveMapElements = new Set<MapElementTypes>([MapElementTypes.Empty, MapElementTypes.Tree, MapElementTypes.Sand, MapElementTypes.Water]);