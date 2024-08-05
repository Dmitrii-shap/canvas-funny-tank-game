import {Direction} from "../enums/direction";

export abstract class GameObject {
    protected _x: number;
    protected _y: number;
    protected _direction: Direction;
    protected _size: number;

    protected constructor(x: number, y: number, direction: number, size: number) {
        this._direction = direction;
        this._x = x;
        this._y = y;
        this._size = size;
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

    get size(): Direction {
        return this._size;
    }

    abstract destroy(): void;
}
