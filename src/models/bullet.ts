import {Direction} from "../enums/direction";
import {defaultBulletSpeed} from "../constants/default-bullet-speed";
import {GameObject} from "./game-object";

export class Bullet extends GameObject {
    private readonly _size: number;
    private readonly _speed: number;
    private readonly _userId: string;

    constructor(x: number, y: number, direction: number, userId = 'player1', size = 3, speed = defaultBulletSpeed) {
        super(x, y, direction);
        this._size = size;
        this._speed = speed;
        this._x = direction === Direction.Right ? x - (size/2) : x;
        this._y = direction === Direction.Down ? y - (size/2) : y
        this._userId = userId;
    }

    get size(): number {
        return this._size;
    }

    get userId(): string {
        return this._userId;
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
