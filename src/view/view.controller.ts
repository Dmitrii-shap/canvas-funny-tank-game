import {MapState} from "../models/map-state";
import userTank from "../../img/userTank.png";
import {Tank} from "../models/tank";
import {Bullet} from "../models/bullet";
import {mapElementDrow} from "./constants/map-element-drow";

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

    private drawMap() {
        const mapElements = this.mapState.mapElements;
        const {ctx, boxSize} = this;

        const deferredDrawFns: (() => void)[] = [];

        for (let i = 0; i < mapElements.length; i++) {
            for (let j = 0; j < mapElements[i].length; j++) {
                switch (mapElements[i][j].type) {
                    case mapElementDrow.empty.id: {
                        ctx.fillStyle = mapElementDrow.empty.fill;
                        ctx.fillRect((j) * boxSize, (i) * boxSize, boxSize, boxSize);
                        break;
                    }
                    case mapElementDrow.brick.id: {
                        ctx.fillStyle = mapElementDrow.brick.fill;
                        ctx.fillRect((j) * boxSize, (i) * boxSize, boxSize, boxSize);
                        break;
                    }
                    case mapElementDrow.block.id: {
                        ctx.fillStyle = mapElementDrow.block.fill;
                        ctx.fillRect((j) * boxSize, (i) * boxSize, boxSize, boxSize);
                        break;
                    }
                    case mapElementDrow.water.id: {
                        ctx.fillStyle = mapElementDrow.water.fill;
                        ctx.fillRect((j) * boxSize, (i) * boxSize, boxSize, boxSize);
                        break;
                    }
                    case mapElementDrow.tree.id: {
                        deferredDrawFns.push(() => {
                            ctx.fillStyle = mapElementDrow.tree.fill;
                            ctx.fillRect((j) * boxSize, (i) * boxSize, boxSize, boxSize);
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
