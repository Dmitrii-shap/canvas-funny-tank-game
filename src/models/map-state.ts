import {MapElements} from "../enums/map-elements";
import {Bullet} from "./bullet";
import {Tank} from "./tank";
import {Direction} from "../enums/direction";
import {ControlService} from "../controls/control.service";
import {canBulletMoveMapElements, canTankMoveMapElements} from "../constants/block-types";
import {MapConfig} from "./map-config";

export class MapState {
    private readonly _bitmap: MapElements[][];
    private readonly _user: Tank;

    constructor(mapConfig: MapConfig,
                private readonly _boxSize: number,
                private controlService: ControlService
    ) {
        const {bitmap, defaultUserPosition} = mapConfig;
        this._bitmap = bitmap;
        this._user = new Tank({
            ...defaultUserPosition,
            id: 'player1',
            x: defaultUserPosition.x * this._boxSize,
            y: defaultUserPosition.y * this._boxSize,
            size: _boxSize
        });
        this.controlService.init();
    }

    destroy() {
        this.controlService.destroy();
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

    get user(): Tank {
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
            case Direction.Left: {
                if (bullet.x <= 0 ||
                    !canBulletMoveMapElements.has(bitmap[Math.floor((bullet.y + bullet.size) / boxSize)][Math.floor((bullet.x) / boxSize)]) ||
                    !canBulletMoveMapElements.has(bitmap[Math.floor((bullet.y) / boxSize)][Math.floor((bullet.x) / boxSize)])
                ) {
                    return false;
                }
                break;
            }
            case Direction.Right: {
                if (bullet.x + bullet.size >= bitmap.length * boxSize ||
                    !canBulletMoveMapElements.has(bitmap[Math.floor((bullet.y + bullet.size) / boxSize)][Math.floor((bullet.x + bullet.size) / boxSize)]) ||
                    !canBulletMoveMapElements.has(bitmap[Math.floor((bullet.y) / boxSize)][Math.floor((bullet.x + bullet.size) / boxSize)])
                ) {
                    return false;
                }
                break;
            }
            case Direction.Down: {
                if (bullet.y + bullet.size >= bitmap.length * boxSize ||
                    !canBulletMoveMapElements.has(bitmap[Math.floor((bullet.y + bullet.size) / boxSize)][Math.floor((bullet.x) / boxSize)]) ||
                    !canBulletMoveMapElements.has(bitmap[Math.floor((bullet.y + bullet.size) / boxSize)][Math.floor((bullet.x + bullet.size) / boxSize)])
                ) {
                    return false;
                }
                break;
            }
            case Direction.Up: {
                if (bullet.y <= 0 ||
                    !canBulletMoveMapElements.has(bitmap[Math.floor((bullet.y) / boxSize)][Math.floor((bullet.x) / boxSize)]) ||
                    !canBulletMoveMapElements.has(bitmap[Math.floor((bullet.y) / boxSize)][Math.floor((bullet.x + bullet.size) / boxSize)])
                ) {
                    return false;
                }

                break;
            }
        }

        return true;
    }

    // вынести логику столкновения, но у танка и пули не много разная логика
    private userControl() {
        const {bitmap, boxSize, user} = this;
        let {x, y, direction, speed, size} = user;
        if (this.controlService.cUp || this.controlService.cLeft || this.controlService.cRight || this.controlService.cDown) {
            if (this.controlService.cLeft) {
                direction = Direction.Left;
                if (x - speed > 0 &&
                    canTankMoveMapElements.has(bitmap[Math.floor((y + size - 1) / boxSize)][Math.floor((x - speed) / boxSize)]) &&
                    canTankMoveMapElements.has(bitmap[Math.floor((y) / boxSize)][Math.floor((x - speed) / boxSize)])
                ) {
                    x -= speed;
                }
            }
            if (this.controlService.cRight) {
                direction = Direction.Right;
                if (x + size + speed < bitmap.length * boxSize &&
                    canTankMoveMapElements.has(bitmap[Math.floor((y + user.size - 1) / boxSize)][Math.floor((x + size + speed) / boxSize)]) &&
                    canTankMoveMapElements.has(bitmap[Math.floor((y) / boxSize)][Math.floor((x + size + speed) / boxSize)])
                ) {
                    x += speed;
                }
            }
            if (this.controlService.cUp) {
                direction = Direction.Up;
                if (y - speed > 0 &&
                    canTankMoveMapElements.has(bitmap[Math.floor((y - speed) / boxSize)][Math.floor((x) / boxSize)]) &&
                    canTankMoveMapElements.has(bitmap[Math.floor((y - speed) / boxSize)][Math.floor((x + size - 1) / boxSize)])
                ) {
                    y -= speed;
                }
            }
            if (this.controlService.cDown) {
                direction = Direction.Down;
                if (y + size + speed < bitmap.length * boxSize &&
                    canTankMoveMapElements.has(bitmap[Math.floor((y + size + speed) / boxSize)][Math.floor((x) / boxSize)]) &&
                    canTankMoveMapElements.has(bitmap[Math.floor((y + size + speed) / boxSize)][Math.floor((x + size - 1) / boxSize)])
                ) {
                    y += speed;
                }
            }

            user.move(x, y, direction);
        }

        if (this.controlService.shot) {
            user.shot();
        }
    }

    gameCircle() {
        this.userControl();
        this.moveAllBullets();
    }
}
