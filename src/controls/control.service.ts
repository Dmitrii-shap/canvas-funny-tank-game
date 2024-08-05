export class ControlService {
    private _cLeft = 0;
    private _cDown = 0;
    private _cUp = 0;
    private _cRight = 0;
    private _shot = 0;

    get cLeft(): number {
        return this._cLeft;
    }

    get cDown(): number {
        return this._cDown;
    }

    get cUp(): number {
        return this._cUp;
    }

    get cRight(): number {
        return this._cRight;
    }

    get shot(): number {
        return this._shot;
    }

    init() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    destroy() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);

        this._cLeft = 0;
        this._cDown = 0;
        this._cUp = 0;
        this._cRight = 0;
        this._shot = 0;
    }

    private handleKeyDown = (event: KeyboardEvent) => {
        switch (event.code) {
            case "KeyW":
            case "ArrowUp": {
                this._cUp = 1;
                break;
            }
            case "KeyS":
            case "ArrowDown": {
                this._cDown = 1;
                break;
            }
            case "KeyA":
            case "ArrowLeft": {
                this._cLeft = 1;
                break;
            }
            case "KeyD":
            case "ArrowRight": {
                this._cRight = 1;
                break;
            }
            case "Space": { //shot
                this._shot = 1;
                break;
            }
        }
    }

    private handleKeyUp = (event: KeyboardEvent) => {
        switch (event.code) {
            case "KeyW":
            case "ArrowUp": {
                this._cUp = 0;
                break;
            }
            case "KeyS":
            case "ArrowDown": {
                this._cDown = 0;
                break;
            }
            case "KeyA":
            case "ArrowLeft": {
                this._cLeft = 0;
                break;
            }
            case "KeyD":
            case "ArrowRight": {
                this._cRight = 0;
                break;
            }

            case "Space": { //shot
                this._shot = 0;
                break;
            }
        }
    }
}
