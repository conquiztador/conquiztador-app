import { Service } from "typedi";
import * as PIXI from "pixi.js";

import Application from "../Application";
import { ButtonEvent } from "../Events";

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
        this._newGameButton = this.createButton("New game");

        this._newGameButton.position.set(this.app.center.x, this.app.center.y);

        this.addChild(this._newGameButton);
    }

    private createButton(content: string): PIXI.Graphics {
        const graphics = new PIXI.Graphics();

        graphics.beginFill(0x32a852);
        graphics.lineStyle(2, 0xcccccc);
        graphics.drawRoundedRect(0, 0, 200, 50, 10);
        graphics.pivot.set(graphics.width / 2, graphics.height / 2);

        graphics.interactive = true;
        graphics.buttonMode = true;

        const text = new PIXI.Text(content, {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: 24,
            fill: 0xffffff,
            align: "left",
        });

        text.pivot.set(text.width / 2, text.height / 2);
        text.position = graphics.pivot.clone();

        graphics.addChild(text);

        return graphics;
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
