import {Direction} from "../enums/direction";
import {defaultBulletSpeed} from "../constants/default-bullet-speed";
import {GameObject} from "./game-object";

export class Bullet extends GameObject {
    private _isDestroy: boolean = false;

    constructor(x: number,
                y: number,
                direction: number,
                private _userId: string,
                _size = 3,
                private _speed = defaultBulletSpeed
    ) {
        super(x, y, direction, _size);
        this._x = direction === Direction.Right ? x - (_size / 2) : x;
        this._y = direction === Direction.Down ? y - (_size / 2) : y
    }

    get size(): number {
        return this._size;
    }

    get userId(): string {
        return this._userId;
    }

    get isDestroy(): boolean {
        return this._isDestroy;
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

    destroy() {
        this._isDestroy = true;
    }
}
