import {GameObject} from "../models/game-object";

// hyun9 da TODO
type Object  = Omit<GameObject, "direction">

export const isColliding = (object1: Object, object2: Object) => (
    object1.x < object2.x + object2.size &&
    object1.x + object1.size > object2.x &&
    object1.y < object2.y + object2.size &&
    object1.y + object1.size > object2.y
);