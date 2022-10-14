import {Bullet} from "./models/bullet";
import {Direction} from "./enums/direction";
import userTank from "../img/userTank.png"
import {defaultMap} from "./constants/maps/default-map";
import {drawMapService} from "./view/services/draw-map.service";
import {User} from "./models/user";
import {ControlService} from "./view/services/control.service";

// create canvas
const canvas = document.createElement('canvas');
canvas.id = "tankGame";
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const tickSpeed = 18;
const boxSize = 32;

const map = defaultMap;
canvas.width = map[0].length * boxSize;
canvas.height = map.length * boxSize;
const userColor = '#FFF488';

const user = new User({
    x: 4 * boxSize,
    y: (map[0].length - 1) * boxSize,
    direction: 3,
    size: boxSize,
})

drawMapService(map, boxSize, ctx);
const tanksSprite = createUserSprite(user);
ControlService.initControls();

setInterval(draw, tickSpeed);

function draw() {
    userControl();
    user.bullets = bulletsMove(user.bullets);
}

function createUserSprite(userData: User) {
    const tanksSprite = new Image();
    tanksSprite.src = userTank;
    tanksSprite.onload = () => {
        ctx.drawImage(tanksSprite, userData.tick, userData.direction * boxSize, boxSize, boxSize, userData.x, userData.y, boxSize, boxSize);
        ctx.fillStyle = userColor;
    };

    return tanksSprite;
}

function drawUserMove(x: number, y: number, direction: Direction) {
    ctx.fillStyle = "#000";
    ctx.fillRect(user.x, user.y, boxSize, boxSize);
    user.move(x, y, direction)
    ctx.drawImage(tanksSprite, user.tick * boxSize, user.direction * boxSize, boxSize, boxSize, user.x, user.y, boxSize, boxSize);
}

function userControl() {
    let {x, y, direction, speed, size} = user;
    console.log(
        x,
        y,
        Math.floor((x) / boxSize),
        Math.floor((y) / boxSize),
        map[Math.floor((x) / boxSize)][Math.floor((y) / boxSize)],
    )
    if (ControlService.cUp || ControlService.cLeft || ControlService.cRight || ControlService.cDown) {
        if (ControlService.cLeft) {
            direction = Direction.Left;
            if (x - speed > 0 &&
                map[Math.floor((y + size - 1) / boxSize)][Math.floor((x - speed) / boxSize)] === 0 &&
                map[Math.floor((y) / boxSize)][Math.floor((x - speed) / boxSize)] === 0
            ) {
                x -= speed;
            }
        }
        if (ControlService.cUp) {
            direction = Direction.Up;
            if (y - speed > 0 &&
                map[Math.floor((y - speed) / boxSize)][Math.floor((x) / boxSize)] === 0 &&
                map[Math.floor((y - speed) / boxSize)][Math.floor((x + size) / boxSize)] === 0
            ) {
                y -= speed;
            }
        }
        if (ControlService.cRight) {
            direction = Direction.Right;
            if (x + size + speed < map.length * boxSize &&
                map[Math.floor((y + user.size - 1) / boxSize)][Math.floor((x + size + speed) / boxSize)] === 0 &&
                map[Math.floor((y) / boxSize)][Math.floor((x + size + speed) / boxSize)] === 0) {
                x += speed;
            }
        }
        if (ControlService.cDown) {
            direction = Direction.Down;
            if (y + size + speed < map.length * boxSize &&
                map[Math.floor((y + size + speed) / boxSize)][Math.floor((x) / boxSize)] === 0 &&
                map[Math.floor((y + size + speed) / boxSize)][Math.floor((x + size) / boxSize)] === 0
            ) {
                y += speed;
            }
        }

        drawUserMove(x, y, direction)
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
    // I think need redraw all map;

    // delete preview draw
    ctx.fillStyle = '#000';
    ctx.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);

    bullet.move();

    switch (bullet.direction) {
        case Direction.Right: {
            if (bullet.x + bullet.size >= map.length * boxSize ||
                map[Math.floor((bullet.y + bullet.size) / boxSize)][Math.floor((bullet.x + bullet.size) / boxSize)] !== 0 ||
                map[Math.floor((bullet.y) / boxSize)][Math.floor((bullet.x + bullet.size) / boxSize)] !== 0
            ) {
                return false;
            }
            break;
        }
        case Direction.Left: {
            if (bullet.x <= 0 ||
                map[Math.floor((bullet.y + bullet.size) / boxSize)][Math.floor((bullet.x) / boxSize)] !== 0 ||
                map[Math.floor((bullet.y) / boxSize)][Math.floor((bullet.x) / boxSize)] !== 0
            ) {
                return false;
            }
            break;
        }
        case Direction.Down: {
            if (bullet.y + bullet.size >= map.length * boxSize ||
                map[Math.floor((bullet.y + bullet.size) / boxSize)][Math.floor((bullet.x) / boxSize)] !== 0 ||
                map[Math.floor((bullet.y + bullet.size) / boxSize)][Math.floor((bullet.x + bullet.size) / boxSize)] !== 0
            ) {
                return false;
            }
            break;
        }
        case Direction.Up: {
            if (bullet.y <= 0 ||
                map[Math.floor((bullet.y) / boxSize)][Math.floor((bullet.x) / boxSize)] !== 0 ||
                map[Math.floor((bullet.y) / boxSize)][Math.floor((bullet.x + bullet.size) / boxSize)] !== 0
            ) {
                return false;
            }

            break;
        }
    }

    // draw bullet
    ctx.fillStyle = 'red';
    ctx.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);

    return true;
}


