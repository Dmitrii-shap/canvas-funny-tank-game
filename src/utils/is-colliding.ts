import {GameObject} from "../models/game-object";

export const isColliding = (object1: GameObject, object2: GameObject) => (
    object1.x < object2.x + object2.size &&
    object1.x + object1.size > object2.x &&
    object1.y < object2.y + object2.size &&
    object1.y + object1.size > object2.y
);