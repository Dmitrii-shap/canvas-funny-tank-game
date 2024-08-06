import {MapElementTypes} from "../enums/map-element-types";

export class MapElement {
    private _x: number;
    private _y: number;

    constructor(private _type: MapElementTypes, indexX: number, indexY: number, private _size: number) {
        this._x = indexX * _size;
        this._y = indexY * _size;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get coordination(): { x: number; y: number } {
        return {x: this._x, y: this._y};
    }

    get type(): MapElementTypes {
        return this._type;
    }

    get size(): number {
        return this._size;
    }
}