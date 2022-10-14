import {Direction} from "../enums/direction";

export class GameObject {
    protected _x: number;
    protected _y: number;
    protected _direction: Direction;

    constructor(x: number, y: number, direction: number) {
        this._direction = direction;
        this._x = x;
        this._y = y;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get direction(): Direction {
        return this._direction;
    }
}
