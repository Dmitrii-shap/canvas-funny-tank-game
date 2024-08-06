import {Direction} from "../enums/direction";
import {ControlService} from "./control.service";

export const getDirection = (controlService: ControlService)=>  {
    if (controlService.cUp) {
        return Direction.Up;
    }

    if (controlService.cDown) {
        return Direction.Down;
    }

    if (controlService.cLeft) {
        return Direction.Left;
    }

    if (controlService.cRight) {
        return Direction.Right;
    }

    return null;
}