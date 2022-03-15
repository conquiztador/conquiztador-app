import { Service } from "typedi";
import * as PIXI from "pixi.js";

import Application from "../Application";
import { Page } from "app/shared/Page";
import { ButtonEvent, GameEvent } from "../Events";
import { createButton } from "app/utils/elements";
import { ScoreService } from "app/services/ScoreService";
import LayerManager from "app/managers/LayerManager";

@Service()
export class EndGamePage extends Page {
    private _exitButton: PIXI.Graphics;
    private scoreText: PIXI.Text;

    constructor(
        app: Application,
        layerManager: LayerManager,
        private scoreService: ScoreService
    ) {
        super(app, layerManager);

        this.app.stage.addChild(this);
        this.visible = false;

        this.addGameOverText();

        this.addExitButton();
        this.attachListeners();
    }

    private reset() {
        if (this.scoreText && this.scoreText.parent) {
            this.scoreText.parent.removeChild(this.scoreText);
        }
    }

    private addGameOverText() {
        const gameOverText = new PIXI.Text("Game over", {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: 24,
            fill: 0xffffff,
            align: "center",
        });

        this.addChild(gameOverText);

        gameOverText.anchor.set(0.5, 0.5);
        gameOverText.position.set(this.app.center.x, 100);
    }

    private addScoreText() {
        this.scoreText = new PIXI.Text(
            `Your final score is: ${this.scoreService.score}`,
            {
                fontFamily: "Arial",
                fontWeight: "bold",
                fontSize: 24,
                fill: 0xffffff,
                align: "center",
            }
        );

        this.addChild(this.scoreText);

        this.scoreText.anchor.set(0.5, 0.5);
        this.scoreText.position.set(this.app.center.x, 160);
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
        if (!data.isCorrect) {
            this.reset();
            this.addScoreText();
            this.visible = true;
        }
    }

    private onExitButtonClicked() {
        this.visible = false;

        this.app.stage.emit(ButtonEvent.exitButtonClicked);
    }
}
