import { Service } from "typedi";
import * as PIXI from "pixi.js";

import Application from "../Application";
import { ButtonEvent } from "../Events";
import { createButton } from "app/utils/elements";

@Service()
export class MenuPage extends PIXI.Container {
    private _newGameButton: PIXI.Graphics;

    constructor(private app: Application) {
        super();

        this.visible = true;
        this.app.stage.addChild(this);

        this.addNewGamesButton();

        this.attachListeners();
    }

    private addNewGamesButton() {
        this._newGameButton = createButton("New game");
        this._newGameButton.position.set(this.app.center.x, this.app.center.y);

        this.addChild(this._newGameButton);
    }

    private attachListeners() {
        this.app.stage.on(
            ButtonEvent.exitButtonClicked,
            this.onExitButtonClicked,
            this
        );

        this._newGameButton.on("pointerup", this.onNewGameButtonClicked, this);
    }

    private onExitButtonClicked() {
        this.visible = true;
    }

    private onNewGameButtonClicked() {
        this.visible = false;
        this.app.stage.emit(ButtonEvent.newGameButtonClicked);
    }
}
