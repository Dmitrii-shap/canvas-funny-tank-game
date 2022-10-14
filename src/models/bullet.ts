import {Direction} from "../enums/direction";
import {defaultBulletSpeed} from "../constants/default-bullet-speed";
import {GameObject} from "./game-object";

export class Bullet extends GameObject {
    private readonly _size: number;
    private readonly _speed: number;

    constructor(x: number, y: number, direction: number, size = 3, speed = defaultBulletSpeed) {
        super(x, y, direction);
        this._size = size;
        this._speed = speed;
        this._x = direction === Direction.Right ? x - size : x;
        this._y = direction === Direction.Down ? y - size : y;
    }

    get size(): number {
        return this._size;
    }
    
    move(): Bullet {
        switch (this.direction) {
            case Direction.Right: {
                this._x = this._x + this._speed;
                break;
            }
            case Direction.Left: {
                this._x = this._x - this._speed;
                break;
            }
            case Direction.Down: {
                this._y = this._y + this._speed;
                break;
            }
            case Direction.Up: {
                this._y = this._y - this._speed;
                break;
            }
        }

        return this;
    }
}
