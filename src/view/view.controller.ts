import {MapState} from "../models/map-state";
import userTank from "../../img/userTank.png";
import {Tank} from "../models/tank";
import {Bullet} from "../models/bullet";
import {mapElementDraw} from "./constants/map-element-draw";

const tankSpriteImageSize = 32;

export class ViewController {
    private readonly canvas: HTMLCanvasElement;
    private readonly tanksSprite: HTMLImageElement;

    constructor(private mapState: MapState) {
        const canvas = document.createElement('canvas');
        canvas.width = mapState.width;
        canvas.height = mapState.height;
        document.body.appendChild(canvas);
        this.canvas = canvas;

        this.tanksSprite = new Image();
        this.tanksSprite.src = userTank;
    }

    private get ctx(): CanvasRenderingContext2D {
        return this.canvas.getContext('2d');
    }

    private get boxSize(): number {
        return this.mapState.boxSize;
    }

    private drawTank(tank: Tank) {
        this.ctx.drawImage(this.tanksSprite,
            tank.tick * tankSpriteImageSize,
            tank.direction * tankSpriteImageSize,
            tankSpriteImageSize,
            tankSpriteImageSize,
            tank.x,
            tank.y,
            this.mapState.user.size,
            this.mapState.user.size
        );
    }

    private drawBullets(bullets: Bullet[]) {
        this.ctx.fillStyle = 'red';

        bullets.forEach(bullet => {
            this.ctx.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);
        })
    }

    private drawMapTexture(texture: typeof mapElementDraw.water.texture, i: number, j: number) {
        this.ctx.drawImage(texture,
            0,
            0,
            texture.naturalWidth,
            texture.naturalWidth,
            j * this.boxSize,
            i * this.boxSize,
            this.boxSize,
            this.boxSize,
        );
    }

    private drawMap() {
        const mapElements = this.mapState.mapElements;
        const {ctx, boxSize} = this;

        const deferredDrawFns: (() => void)[] = [];

        for (let i = 0; i < mapElements.length; i++) {
            for (let j = 0; j < mapElements[i].length; j++) {
                switch (mapElements[i][j].type) {
                    case mapElementDraw.empty.id: {
                        ctx.fillStyle = mapElementDraw.empty.fill;
                        ctx.fillRect((j) * boxSize, (i) * boxSize, boxSize, boxSize);
                        break;
                    }
                    case mapElementDraw.brick.id: {
                        ctx.fillStyle = mapElementDraw.brick.fill;
                        this.drawMapTexture(mapElementDraw.brick.texture, i, j);
                        break;
                    }
                    case mapElementDraw.sand.id: {
                        ctx.fillStyle = mapElementDraw.sand.fill;
                        this.drawMapTexture(mapElementDraw.sand.texture, i, j);
                        break;
                    }
                    case mapElementDraw.water.id: {
                        ctx.fillStyle = mapElementDraw.water.fill;
                        this.drawMapTexture(mapElementDraw.water.texture, i, j);
                        break;
                    }
                    case mapElementDraw.tree.id: {
                        ctx.fillStyle = mapElementDraw.tree.fill;
                        ctx.fillRect((j) * boxSize, (i) * boxSize, boxSize, boxSize);
                        deferredDrawFns.push(() => {
                            this.drawMapTexture(mapElementDraw.tree.texture, i, j);
                        })

                        break;
                    }
                }

                ctx.fillStyle = "#fff"

                // debug elements;
                // const coord = mapElements[i][j].coordination;
                // // ctx.fillText(`${coord.x}/${coord.y}`, (j) * boxSize, (i) * boxSize + 12,);
                // ctx.fillText(`${coord.x}/${coord.y}`, (j) * boxSize, (i) * boxSize + 12);
                // ctx.strokeStyle = "#FF0000";
                // ctx.strokeRect((j) * boxSize, (i) * boxSize, boxSize, boxSize);
            }
        }

        return {deferredDrawFns} as const;
    }

    draw() {
        const {deferredDrawFns} = this.drawMap();
        this.drawTank(this.mapState.user);
        this.drawBullets(this.mapState.allBullets);

        deferredDrawFns.forEach(fn => fn());
    }

    destroy() {
        this.canvas.remove();
        this.mapState.destroy();
    }
}
