import {Bullet} from "./models/bullet";
import {Direction} from "./enums/direction";
import userTank from "../img/userTank.png"
import {defaultMap} from "./constants/maps/default-map";
import {drawMapService} from "./view/services/draw-map.service";
import {User} from "./models/user";
import {ControlService} from "./view/services/control.service";
import {MapState} from "./models/map-state";

// create canvas
const canvas = document.createElement('canvas');
canvas.id = "tankGame";
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// TODO bullets in user or in mapState ?????
const mapState = new MapState({bitmap: defaultMap.bitmap, boxSize: 32, userPosition: defaultMap.userPosition });
const {bitmap, boxSize, user, bullets} = mapState;

canvas.width = bitmap[0].length * boxSize;
canvas.height = bitmap.length * boxSize;

const tanksSprite = createUserSprite(user);
ControlService.initControls();


function createUserSprite(userData: User) {
    const tanksSprite = new Image();
    tanksSprite.src = userTank;
    tanksSprite.onload = () => {
        ctx.drawImage(tanksSprite, userData.tick, userData.direction * boxSize, boxSize, boxSize, userData.x, userData.y, boxSize, boxSize);
    };

    return tanksSprite;
}

function drawUser() {
    ctx.drawImage(tanksSprite, user.tick * boxSize, user.direction * boxSize, boxSize, boxSize, user.x, user.y, boxSize, boxSize);
}

function userControl() {
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
        if (ControlService.cUp) {
            direction = Direction.Up;
            if (y - speed > 0 &&
                bitmap[Math.floor((y - speed) / boxSize)][Math.floor((x) / boxSize)] === 0 &&
                bitmap[Math.floor((y - speed) / boxSize)][Math.floor((x + size) / boxSize)] === 0
            ) {
                y -= speed;
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

function bulletsMove(bullets: Bullet[]): Bullet[] {
    for (let i = 0; i < bullets.length; i++) {
        if (!moveBullet(bullets[i])) {
            delete (bullets[i]);
        }
    }

    return bullets.filter(item => !!item)
}

function moveBullet(bullet: Bullet): boolean {
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

function drawBullets(bullets: Bullet[]) {
    ctx.fillStyle = 'red';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);
    })
}

// draw to draw controller
function draw() {
    drawMapService(bitmap, boxSize, ctx);
    drawUser();
    drawBullets(user.bullets);
}

function gameCircle() {
    userControl();
    user.bullets = bulletsMove(user.bullets);

    draw();
    setTimeout(() => {
        requestAnimationFrame(gameCircle);
    }, 16)
}

gameCircle();
