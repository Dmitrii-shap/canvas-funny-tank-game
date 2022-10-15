export class ControlService {
    static cLeft = 0;
    static cDown = 0;
    static cUp = 0;
    static cRight = 0;
    static shot = 0;

    static initControls() {
        // keys
        document.onkeydown = (e) => {
            switch (e.keyCode) {
                case 38: { //up
                    ControlService.cUp = 1;
                    break;
                }
                case 40: { //down
                    ControlService.cDown = 1;
                    break;
                }
                case 37: { //left
                    ControlService.cLeft = 1;
                    break;
                }

                case 39: { //right
                    ControlService.cRight = 1;
                    break;
                }

                case 32: { //shot
                    ControlService.shot = 1;
                    break;
                }
            }
        };
        document.onkeyup = (e) => {
            switch (e.keyCode) {
                case 38: { //up
                    ControlService.cUp = 0;
                    break;
                }
                case 40: { //bottom
                    ControlService.cDown = 0;
                    break;
                }
                case 37: { //left
                    ControlService.cLeft = 0;
                    break;
                }

                case 39: { //right
                    ControlService.cRight = 0;
                    break;
                }

                case 32: { //shot
                    ControlService.shot = 0;
                    break;
                }
            }
        };
    }
}
