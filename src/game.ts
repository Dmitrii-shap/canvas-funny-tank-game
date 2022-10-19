import {defaultMap} from "./constants/maps/default-map";
import {ControlService} from "./controls/control.service";
import {MapState} from "./models/map-state";
import {ViewController} from "./view/view.controller";

const mapState = new MapState({mapConfig: defaultMap, boxSize: 32});

const view = new ViewController(mapState);

// отдельный контроллер для управления и управление, выпилить его из мапСтейт
ControlService.initControls();

function gameCircle() {
    mapState.gameCircle();

    view.draw();
    setTimeout(() => {
        requestAnimationFrame(gameCircle);
    }, 16)
}

gameCircle();
