import {Bullet} from "./models/bullet";
import userTank from "../img/userTank.png"
import {defaultMap} from "./constants/maps/default-map";
import {drawMapService} from "./view/services/draw-map.service";
import {User} from "./models/user";
import {ControlService} from "./controls/control.service";
import {MapState} from "./models/map-state";

// create canvas
const canvas = document.createElement('canvas');
canvas.id = "tankGame";
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const mapState = new MapState({bitmap: defaultMap.bitmap, boxSize: 32, userPosition: defaultMap.userPosition });
const {bitmap, boxSize} = mapState;

canvas.width = bitmap[0].length * boxSize;
canvas.height = bitmap.length * boxSize;

const tanksSprite = createUserSprite();
ControlService.initControls();

function createUserSprite() {
    const tanksSprite = new Image();
    tanksSprite.src = userTank;
    return tanksSprite;
}

function drawUser(user: User) {
    ctx.drawImage(tanksSprite, user.tick * boxSize, user.direction * boxSize, boxSize, boxSize, user.x, user.y, boxSize, boxSize);
}

function drawBullets(bullets: Bullet[]) {
    ctx.fillStyle = 'red';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);
    })
}

// draw to draw controller
function draw() {
    drawMapService(bitmap, boxSize, ctx);
    drawUser(mapState.user);
    drawBullets(mapState.allBullets);
}

function gameCircle() {
    mapState.gameCircle();

    draw();
    setTimeout(() => {
        requestAnimationFrame(gameCircle);
    }, 16)
}

gameCircle();
