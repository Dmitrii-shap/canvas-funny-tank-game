import {MapElements} from "../../enums/map-elements";
import {mapElements} from "../constants/map-elements";

export const drawMapService = (bitMap: MapElements[][], boxSize: number, ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < bitMap.length; i++) {
        for (let j = 0; j < bitMap[i].length; j++) {
            switch (bitMap[i][j]) {
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


