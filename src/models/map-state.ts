import {MapElements} from "../enums/map-elements";
import {Bullet} from "./bullet";
import {User} from "./user";
import {UserPosition} from "../constants/maps/default-map";

export class MapState {
    private _bitmap: MapElements[][];
    private _boxSize: number;
    private _bullets: Bullet[];
    private _user: User;

    constructor({bitmap, boxSize, userPosition}: {bitmap: MapElements[][], boxSize: number, userPosition: UserPosition }) {
        this._bitmap = bitmap;
        this._boxSize = boxSize;
        this._bullets = [];
        this._user = new User({...userPosition, x: userPosition.x * boxSize, y: userPosition.y * boxSize, size: boxSize})
    }

    get bitmap(): MapElements[][] {
        return this._bitmap;
    }

    get boxSize(): number {
        return this._boxSize;
    }

    get bullets(): Bullet[] {
        return this._bullets;
    }

    get user(): User {
        return this._user;
    }
}
