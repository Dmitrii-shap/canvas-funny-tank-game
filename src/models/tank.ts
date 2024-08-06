import {Bullet} from "./bullet";
import {GameObject} from "./game-object";
import {Direction} from "../enums/direction";

const defaultSpeed = 2;
const userSpriteTickCount = 7;
const defaultBulletCoolDown = 150;
const defaultMaxBullets = 4;

export class Tank extends GameObject {
    private readonly _id: string;
    private _tick: number;
    private _bullets: Bullet[];
    private readonly _speed: number;
    private _isShotCoolDown: boolean;
    private readonly _shotCoolDown: number;
    private readonly _maxBullets: number;

    constructor(data: { id: string, x: number, y: number, direction: number, size: number, speed?: number }) {
        super(data.x, data.y, data.direction, data.size)
        this._id = data.id;
        this._tick = 0;
        this._bullets = [];
        this._speed = data.speed || defaultSpeed;
        this._shotCoolDown = defaultBulletCoolDown;
        this._isShotCoolDown = false;
        this._maxBullets = defaultMaxBullets;
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

    move(x: number, y: number, direction: number) {
        this._x = x;
        this._y = y;
        this._direction = direction;

        // TODO tick is draw config, move to draw object
        this._tick++;
        if (this._tick >= userSpriteTickCount) {
            this._tick = 0;
        }
    }

    shot() {
        if (this.bullets.length >= this._maxBullets || this._isShotCoolDown) {
            return;
        }

        const coordinate = this.createBulletCoordinate;
        this.bullets.push(new Bullet(coordinate.x, coordinate.y, this.direction, this.id));

        this._isShotCoolDown = true;

        setTimeout(() => {
            this._isShotCoolDown = false;
        }, this._shotCoolDown)
    }

    destroy(): void {
    }

    removeDestroyedBullet(): void {
        this._bullets = this._bullets.filter(item => !item.isDestroy);
    }

    private get createBulletCoordinate() {
        switch (this.direction) {
            case Direction.Right: {
                return {x: this.x + this.size, y: this.y + this.size / 2}
            }

            case Direction.Left: {
                return {x: this.x, y: this.y + this.size / 2}
            }

            case Direction.Up: {
                return {x: this.x + this.size / 2, y: this.y}
            }

            case Direction.Down: {
                return {x: this.x + this.size / 2, y: this.y + this.size}
            }
        }
    }
}
