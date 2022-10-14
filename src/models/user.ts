import {Bullet} from "./bullet";
import {GameObject} from "./game-object";
import {Direction} from "../enums/direction";

const defaultSpeed = 2;
const userSpriteTickCount = 7;

// ITS tank, not USER, tick is draw config, move to draw object
export class User extends GameObject {
    tick: number;
    bullets: Bullet[];
    speed: number;
    size: number;
    isBulletCoolDown: boolean;
    bulletCoolDown: number;
    maxBullets: number;

    constructor(data: { x: number, y: number, direction: number, size: number, speed?: number }) {
        super(data.x, data.y, data.direction);
        this.tick = 0;
        this.bullets = [];
        this.speed = data.speed || defaultSpeed;
        this.size = data.size;
        this.bulletCoolDown = 150;
        this.isBulletCoolDown = false;
        this.maxBullets = 4;
    }

    move(x: number, y: number, direction: number) {
        this._x = x;
        this._y = y;
        this._direction = direction;
        this.tick++;
        if (this.tick >= userSpriteTickCount) {
            this.tick = 0;
        }
    }

    shot() {
        if (this.bullets.length >= this.maxBullets || this.isBulletCoolDown) {
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

        this.bullets.push(new Bullet(coordinate.x, coordinate.y, this.direction));

        this.isBulletCoolDown = true;

        setTimeout(() => {
            this.isBulletCoolDown = false;
        }, this.bulletCoolDown)
    }
}
