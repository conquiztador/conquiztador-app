import { Service } from "typedi";
import * as PIXI from "pixi.js";

import Application from "../Application";
import { ButtonEvent, GameEvent } from "../Events";
import { createButton } from "app/utils/elements";

@Service()
export class EndGamePage extends PIXI.Container {
    private _exitButton: PIXI.Graphics;

    constructor(private app: Application) {
        super();

        this.app.stage.addChild(this);
        this.visible = false;

        this.addGameOverText();

        this.addExitButton();
        this.attachListeners();
    }

    private addGameOverText() {
        const questionText = new PIXI.Text("Game over", {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: 24,
            fill: 0xffffff,
            align: "center",
        });

        this.addChild(questionText);

        questionText.anchor.set(0.5, 0.5);
        questionText.position.set(this.app.center.x, 100);
    }

    private addExitButton() {
        this._exitButton = createButton("Exit");

        this._exitButton.position.set(
            this.app.center.x,
            this.app.center.y + 300
        );

        this.addChild(this._exitButton);
    }

    private attachListeners() {
        this._exitButton.on("pointerdown", this.onExitButtonClicked, this);

        this.app.stage.on(
            GameEvent.answerSelected,
            this.onAnswerSelected,
            this
        );
    }

    private onAnswerSelected(data: { isCorrect: boolean }) {
        console.error(data);

        if (!data.isCorrect) {
            this.visible = true;
        }
    }

    private onExitButtonClicked() {
        this.visible = false;

        this.app.stage.emit(ButtonEvent.exitButtonClicked);
    }
}
