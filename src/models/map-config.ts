import {MapElements} from "../enums/map-elements";
import {UserPosition} from "./position";

export interface MapConfig {
    defaultUserPosition: UserPosition;
    bitmap: MapElements[][];
}