import {defaultMap} from "./constants/maps/default-map";
import {ControlService} from "./controls/control.service";
import {MapState} from "./models/map-state";
import {ViewController} from "./view/view.controller";

const mapState = new MapState(defaultMap, 32, new ControlService());
const view = new ViewController(mapState);

function gameCircle() {
    mapState.gameCircle();
    view.draw();

    setTimeout(() => {
        requestAnimationFrame(gameCircle);
    }, 16)
}

gameCircle();
