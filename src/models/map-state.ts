import {MapElements} from "../enums/map-elements";
import {Bullet} from "./bullet";
import {User} from "./user";
import {UserPosition} from "../constants/maps/default-map";
import {Direction} from "../enums/direction";
import {ControlService} from "../controls/control.service";

export class MapState {
    private _bitmap: MapElements[][];
    private _boxSize: number;
    private _user: User;

    constructor({bitmap, boxSize, userPosition}: {bitmap: MapElements[][], boxSize: number, userPosition: UserPosition }) {
        this._bitmap = bitmap;
        this._boxSize = boxSize;
        this._user = new User({...userPosition, id: 'player1', x: userPosition.x * boxSize, y: userPosition.y * boxSize, size: boxSize})
    }

    get bitmap(): MapElements[][] {
        return this._bitmap;
    }

    get boxSize(): number {
        return this._boxSize;
    }

    get allBullets(): Bullet[] {
        return [...this.user.bullets];
    }

    get user(): User {
        return this._user;
    }

    private moveAllBullets() {
        const bullets = this.allBullets;

        bullets.forEach((bullet) => {
            if (!this.moveBullet(bullet)) {
                bullet.destroy();
            }
        })

        this.user.bullets = bullets.filter(item => !item.isDestroy && item.userId === this.user.id)
    }

    private moveBullet(bullet: Bullet): boolean {
        const {bitmap, boxSize} = this;
        bullet.move();

        switch (bullet.direction) {
            case Direction.Right: {
                if (bullet.x + bullet.size >= bitmap.length * boxSize ||
                    bitmap[Math.floor((bullet.y + bullet.size) / boxSize)][Math.floor((bullet.x + bullet.size) / boxSize)] !== 0 ||
                    bitmap[Math.floor((bullet.y) / boxSize)][Math.floor((bullet.x + bullet.size) / boxSize)] !== 0
                ) {
                    return false;
                }
                break;
            }
            case Direction.Left: {
                if (bullet.x <= 0 ||
                    bitmap[Math.floor((bullet.y + bullet.size) / boxSize)][Math.floor((bullet.x) / boxSize)] !== 0 ||
                    bitmap[Math.floor((bullet.y) / boxSize)][Math.floor((bullet.x) / boxSize)] !== 0
                ) {
                    return false;
                }
                break;
            }
            case Direction.Down: {
                if (bullet.y + bullet.size >= bitmap.length * boxSize ||
                    bitmap[Math.floor((bullet.y + bullet.size) / boxSize)][Math.floor((bullet.x) / boxSize)] !== 0 ||
                    bitmap[Math.floor((bullet.y + bullet.size) / boxSize)][Math.floor((bullet.x + bullet.size) / boxSize)] !== 0
                ) {
                    return false;
                }
                break;
            }
            case Direction.Up: {
                if (bullet.y <= 0 ||
                    bitmap[Math.floor((bullet.y) / boxSize)][Math.floor((bullet.x) / boxSize)] !== 0 ||
                    bitmap[Math.floor((bullet.y) / boxSize)][Math.floor((bullet.x + bullet.size) / boxSize)] !== 0
                ) {
                    return false;
                }

                break;
            }
        }

        return true;
    }

    private userControl() {
        const {bitmap, boxSize, user} = this;
        let {x, y, direction, speed, size} = user;

        if (ControlService.cUp || ControlService.cLeft || ControlService.cRight || ControlService.cDown) {
            if (ControlService.cLeft) {
                direction = Direction.Left;
                if (x - speed > 0 &&
                    bitmap[Math.floor((y + size - 1) / boxSize)][Math.floor((x - speed) / boxSize)] === 0 &&
                    bitmap[Math.floor((y) / boxSize)][Math.floor((x - speed) / boxSize)] === 0
                ) {
                    x -= speed;
                }
            }
            if (ControlService.cRight) {
                direction = Direction.Right;
                if (x + size + speed < bitmap.length * boxSize &&
                    bitmap[Math.floor((y + user.size - 1) / boxSize)][Math.floor((x + size + speed) / boxSize)] === 0 &&
                    bitmap[Math.floor((y) / boxSize)][Math.floor((x + size + speed) / boxSize)] === 0) {
                    x += speed;
                }
            }
            if (ControlService.cUp) {
                direction = Direction.Up;
                if (y - speed > 0 &&
                    bitmap[Math.floor((y - speed) / boxSize)][Math.floor((x) / boxSize)] === 0 &&
                    bitmap[Math.floor((y - speed) / boxSize)][Math.floor((x + size) / boxSize)] === 0
                ) {
                    y -= speed;
                }
            }
            if (ControlService.cDown) {
                direction = Direction.Down;
                if (y + size + speed < bitmap.length * boxSize &&
                    bitmap[Math.floor((y + size + speed) / boxSize)][Math.floor((x) / boxSize)] === 0 &&
                    bitmap[Math.floor((y + size + speed) / boxSize)][Math.floor((x + size) / boxSize)] === 0
                ) {
                    y += speed;
                }
            }

            user.move(x, y, direction);
        }

        if (ControlService.shot) {
            user.shot();
        }
    }

    gameCircle() {
        this.userControl();
        this.moveAllBullets();
    }
}
