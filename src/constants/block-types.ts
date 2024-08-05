import {MapElements} from "../enums/map-elements";

export const canTankMoveMapElements = new Set([MapElements.Empty, MapElements.Tree, MapElements.Sand]);

export const canBulletMoveMapElements = new Set([MapElements.Empty, MapElements.Tree, MapElements.Sand, MapElements.Water]);