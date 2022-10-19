import {Bullet} from "./bullet";
import {GameObject} from "./game-object";
import {Direction} from "../enums/direction";

const defaultSpeed = 2;
const userSpriteTickCount = 7;

// tick is draw config, move to draw object
export class Tank extends GameObject {
    private readonly _id: string;
    private _tick: number;
    private _bullets: Bullet[];
    private _speed: number;
    private readonly _size: number;
    private _isBulletCoolDown: boolean;
    private readonly _bulletCoolDown: number;
    private readonly _maxBullets: number;

    constructor(data: { id: string, x: number, y: number, direction: number, size: number, speed?: number }) {
        super(data.x, data.y, data.direction)
        this._id = data.id;
        this._tick = 0;
        this._bullets = [];
        this._speed = data.speed || defaultSpeed;
        this._size = data.size;
        this._bulletCoolDown = 150;
        this._isBulletCoolDown = false;
        this._maxBullets = 4;
    }

    get id(): string {
        return this._id;
    }

    get size(): number {
        return this._size;
    }

    get speed(): number {
        return this._speed;
    }

    get tick(): number {
        return this._tick;
    }

    get bullets(): Bullet[] {
        return this._bullets;
    }

    set bullets(value: Bullet[]) {
        this._bullets = value;
    }

    move(x: number, y: number, direction: number) {
        this._x = x;
        this._y = y;
        this._direction = direction;
        this._tick++;
        if (this._tick >= userSpriteTickCount) {
            this._tick = 0;
        }
    }

    shot() {
        if (this.bullets.length >= this._maxBullets || this._isBulletCoolDown) {
            return;
        }

        const coordinate = {} as { x: number, y: number };

        switch (this.direction) {
            case Direction.Right: {
                coordinate.x = this.x + this.size;
                coordinate.y = this.y + this.size / 2;
                break;
            }
            case Direction.Left: {
                coordinate.x = this.x;
                coordinate.y = this.y + this.size / 2;
                break;
            }
            case Direction.Down: {
                coordinate.x = this.x + this.size / 2;
                coordinate.y = this.y + this.size;
                break;
            }
            case Direction.Up: {
                coordinate.x = this.x + this.size / 2;
                coordinate.y = this.y;
                break;
            }
        }

        this.bullets.push(new Bullet(coordinate.x, coordinate.y, this.direction, this.id));

        this._isBulletCoolDown = true;

        setTimeout(() => {
            this._isBulletCoolDown = false;
        }, this._bulletCoolDown)
    }
}
