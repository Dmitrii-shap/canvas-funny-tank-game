import {Bullet} from "./bullet";
import {Tank} from "./tank";
import {ControlService} from "../controls/control.service";
import {canBulletMoveMapElements, canTankMoveMapElements} from "../constants/block-types";
import {MapConfig} from "./map-config";
import {getDirection} from "../controls/control-direction-map";
import {MapElement} from "./map-element";
import {GameObject} from "./game-object";

export class MapState {
    private readonly _mapElements: MapElement[][];
    private readonly _user: Tank;

    constructor(mapConfig: MapConfig,
                private readonly _boxSize: number,
                private readonly controlService: ControlService
    ) {
        const {bitmap, defaultUserPosition} = mapConfig;
        this._mapElements = bitmap.map((bitmapRow, indexX) =>
            bitmapRow.map((type, indexY) => new MapElement(type, indexX, indexY, this._boxSize)));

        this._user = new Tank({
            ...defaultUserPosition,
            id: 'player1',
            x: defaultUserPosition.x * this._boxSize,
            y: defaultUserPosition.y * this._boxSize,
            size: Math.round(this._boxSize * 0.8),
        });
        this.controlService.init();
    }

    destroy() {
        this.controlService.destroy();
    }

    get mapElements(): MapElement[][] {
        return this._mapElements;
    }

    get boxSize(): number {
        return this._boxSize;
    }

    get user(): Tank {
        return this._user;
    }

    get allBullets(): Bullet[] {
        return [...this.user.bullets];
    }

    private moveAllBullets() {
        const bullets = this.allBullets;

        bullets.forEach((bullet) => {
            this.moveBullet(bullet)
        })

        // Все танки чекают свои пули на дестрой и убивают их;
        this.user.removeDestroyedBullet();
    }

    private moveBullet(bullet: Bullet) {
        bullet.move();
        const bulletMapElements = this.getMapElementsByGameObject(bullet);

        if (!bulletMapElements.length) {
            bullet.destroy();
        }

        // TODO будем проверять коллизию с другими танками и другими пулями
        if (!bulletMapElements.every(item => item && canBulletMoveMapElements.has(item.type))) {
            bullet.destroy();
        }
    }

    private moveUserByControls() {
        const {user, boxSize, mapElements} = this;
        const {x, y, direction, speed, size} = user;
        const newDirection = getDirection(this.controlService);
        let newX = x;
        let newY = y;

        if (newDirection !== null) {
            // Если мы поменяли направление 1 кадр на разворот
            if (direction === newDirection) {
                if (this.controlService.cLeft) {
                    if (x - speed > 0 &&
                        canTankMoveMapElements.has(mapElements[Math.floor((y + size - 1) / boxSize)][Math.floor((x - speed) / boxSize)].type) &&
                        canTankMoveMapElements.has(mapElements[Math.floor((y) / boxSize)][Math.floor((x - speed) / boxSize)].type)
                    ) {
                        newX -= speed;
                    }
                }
                if (this.controlService.cRight) {
                    if (x + size + speed < mapElements.length * boxSize &&
                        canTankMoveMapElements.has(mapElements[Math.floor((y + user.size - 1) / boxSize)][Math.floor((x + size + speed) / boxSize)].type) &&
                        canTankMoveMapElements.has(mapElements[Math.floor((y) / boxSize)][Math.floor((x + size + speed) / boxSize)].type)
                    ) {
                        newX += speed;
                    }
                }
                if (this.controlService.cUp) {
                    if (y - speed > 0 &&
                        canTankMoveMapElements.has(mapElements[Math.floor((y - speed) / boxSize)][Math.floor((x) / boxSize)].type) &&
                        canTankMoveMapElements.has(mapElements[Math.floor((y - speed) / boxSize)][Math.floor((x + size - 1) / boxSize)].type)
                    ) {
                        newY -= speed;
                    }
                }
                if (this.controlService.cDown) {
                    if (y + size + speed < mapElements.length * boxSize &&
                        canTankMoveMapElements.has(mapElements[Math.floor((y + size + speed) / boxSize)][Math.floor((x) / boxSize)].type) &&
                        canTankMoveMapElements.has(mapElements[Math.floor((y + size + speed) / boxSize)][Math.floor((x + size - 1) / boxSize)].type)
                    ) {
                        newY += speed;
                    }
                }
            }

            user.move(newX, newY, newDirection);
        }

        if (this.controlService.shot) {
            user.shot();
        }
    }

    gameCircle() {
        this.moveUserByControls();
        this.moveAllBullets();
    }

    private getMapElementByCoordinate(x: number, y: number): MapElement {
        if (x < 0 || y < 0 || y > this.mapElements.length * this.boxSize || x > this.mapElements[0].length * this.boxSize) {
            return null;
        }

        return this.mapElements[Math.floor(y / this.boxSize)][Math.floor(x / this.boxSize)];
    }

    private getMapElementsByGameObject(gameObject: Pick<GameObject, "x" | "y" | "size">) {
        return [
            this.getMapElementByCoordinate(gameObject.x, gameObject.y),
            this.getMapElementByCoordinate(gameObject.x + gameObject.size, gameObject.y),
            this.getMapElementByCoordinate(gameObject.x, gameObject.y + gameObject.size),
            this.getMapElementByCoordinate(gameObject.x + gameObject.size, gameObject.y + gameObject.size)
        ]

        // return removeDuplicates(mapElements.filter(item => !!item), (item) => `${item.x}-${item.y}`);
    }
}
