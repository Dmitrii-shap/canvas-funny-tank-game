import {MapState} from "../models/map-state";
import userTank from "../../img/userTank.png";
import {Tank} from "../models/tank";
import {Bullet} from "../models/bullet";
import {mapElements} from "./constants/map-elements";

export class ViewController {
    canvas: HTMLCanvasElement;
    mapState: MapState;
    tanksSprite: HTMLImageElement;

    constructor(mapState: MapState) {
        this.mapState = mapState;

        const canvas = document.createElement('canvas');
        canvas.width = mapState.bitmap[0].length * mapState.boxSize;
        canvas.height = mapState.bitmap.length * mapState.boxSize;
        document.body.appendChild(canvas);
        this.canvas = canvas;

        this.tanksSprite = new Image(mapState.boxSize, mapState.boxSize);
        this.tanksSprite.src = userTank;
    }

    get ctx(): CanvasRenderingContext2D {
        return this.canvas.getContext('2d');
    }

    get boxSize(): number {
        return this.mapState.boxSize;
    }

    //call before remove
    destroyCanvas() {
        this.canvas.remove();
    }

    drawTank(tank: Tank) {
        const spriteImageSize = 32;
        this.ctx.drawImage(this.tanksSprite,
            tank.tick * spriteImageSize,
            tank.direction * spriteImageSize,
            spriteImageSize,
            spriteImageSize,
            tank.x,
            tank.y,
            this.boxSize,
            this.boxSize
        );

        this.ctx.fillStyle = '#fff'
        this.ctx.fillRect(tank.x, tank.y, this.boxSize, this.boxSize)
    }

    drawBullets(bullets: Bullet[]) {
        this.ctx.fillStyle = 'red';

        bullets.forEach(bullet => {
            this.ctx.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);
        })
    }

    drawMap() {
        const bitmap = this.mapState.bitmap;
        const {ctx, boxSize} = this;

        for (let i = 0; i < bitmap.length; i++) {
            for (let j = 0; j < bitmap[i].length; j++) {
                switch (bitmap[i][j]) {
                    case mapElements.empty.id: {
                        ctx.fillStyle = mapElements.empty.fill;
                        break;
                    }
                    case mapElements.brick.id: {
                        ctx.fillStyle = mapElements.brick.fill;
                        break;
                    }
                    case mapElements.block.id: {
                        ctx.fillStyle = mapElements.block.fill;
                        break;
                    }
                    case mapElements.water.id: {
                        ctx.fillStyle = mapElements.water.fill;
                        break;
                    }
                    case mapElements.tree.id: {
                        ctx.fillStyle = mapElements.tree.fill;
                        break;
                    }
                }

                ctx.fillRect((j) * boxSize, (i) * boxSize, boxSize, boxSize);

                ctx.fillStyle = "#fff"

                // debug elements;
                // ctx.fillText(`${i}/${j}`, (j) * boxSize, (i) * boxSize + 12,);
                // ctx.strokeStyle = "#FF0000";
                // ctx.strokeRect((j) * boxSize, (i) * boxSize, boxSize, boxSize);
            }
        }
    }

    draw() {
        this.drawMap();
        this.drawTank(this.mapState.user);
        this.drawBullets(this.mapState.allBullets);
    }
}
