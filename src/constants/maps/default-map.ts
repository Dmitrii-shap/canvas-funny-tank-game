import {MapElements} from "../../enums/map-elements";
import {Direction} from "../../enums/direction";
import {MapConfig} from "../../models/map-config";

export const defaultMap: MapConfig = {
    defaultUserPosition: {
        x: 5,
        y: 14,
        direction: Direction.Up,
    },
    bitmap: [
        [MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty],
        [MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Sand, MapElements.Sand, MapElements.Sand, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Brick],
        [MapElements.Sand, MapElements.Sand, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Sand, MapElements.Sand, MapElements.Sand, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Sand, MapElements.Sand],
        [MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Water, MapElements.Water, MapElements.Water, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Water, MapElements.Water, MapElements.Water, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty],
        [MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Brick, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty],
        [MapElements.Tree, MapElements.Tree, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Brick, MapElements.Empty, MapElements.Brick, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Empty, MapElements.Tree, MapElements.Tree]
    ]
};
