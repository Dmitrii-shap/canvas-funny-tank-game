import {MapElements} from "../../enums/map-elements";
import {Direction} from "../../enums/direction";

export interface UserPosition {
    x: number;
    y: number;
    direction: Direction;
}

export const defaultMap = {
    userPosition: {
        x: 4,
        y: 14,
        direction: Direction.Up,
    } as UserPosition,
    bitmap: [
        [MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty],
        [MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Block, MapElements.Block, MapElements.Block, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Brick],
        [MapElements.Block, MapElements.Block, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Block, MapElements.Block, MapElements.Block, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Block, MapElements.Block],
        [MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Water, MapElements.Water, MapElements.Water, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Water, MapElements.Water, MapElements.Water, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Empty, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty]
    ]
};
