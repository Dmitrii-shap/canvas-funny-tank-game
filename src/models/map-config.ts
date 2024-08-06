import {UserPosition} from "./position";
import {MapElementTypes} from "../enums/map-element-types";

export interface MapConfig {
    defaultUserPosition: UserPosition;
    bitmap: MapElementTypes[][];
}