import { Service } from "typedi";
import * as PIXI from "pixi.js";

import Application from "../Application";
import { ButtonEvent } from "../Events";
import { Page } from "shared/Page";
import { createButton } from "app/utils/elements";
import LayerManager from "app/managers/LayerManager";

@Service()
export class MenuPage extends Page {
    private _newGameButton: PIXI.Graphics;

    constructor(app: Application, layerManager: LayerManager) {
        super(app, layerManager);

        this.visible = true;

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
