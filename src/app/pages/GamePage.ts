import { Service } from "typedi";
import * as PIXI from "pixi.js";

import Application from "../Application";
import { ButtonEvent, GameEvent } from "../Events";
import { QuestionComponent } from "app/components/QuestionComponent";
import { ScoreComponent } from "app/components/ScoreComponent";
import { createButton } from "app/utils/elements";

@Service()
export class GamePage extends PIXI.Container {
    private _exitButton: PIXI.Graphics;

    constructor(
        private app: Application,
        private questionComponent: QuestionComponent,
        private scoreComponent: ScoreComponent
    ) {
        super();

        this.app.stage.addChild(this);
        this.visible = false;

        this.addChild(this.scoreComponent);
        this.addChild(this.questionComponent);

        this.questionComponent.loadQuestion();

        this.addExitButton();
        this.attachListeners();
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
        this.app.stage.on(
            ButtonEvent.newGameButtonClicked,
            this.onNewGameButtonClicked,
            this
        );
        this._exitButton.on("pointerup", this.onExitButtonClicked, this);

        this.app.stage.on(
            GameEvent.answerSelected,
            this.onAnswerSelected,
            this
        );
    }

    private onNewGameButtonClicked() {
        this.scoreComponent.resetScore();
        this.visible = true;
    }

    private onAnswerSelected(data: { isCorrect: boolean }) {
        if (data.isCorrect) {
            this.scoreComponent.increaseScore();
            this.questionComponent.loadQuestion();
        } else {
            this.visible = false;
        }
    }

    private onExitButtonClicked() {
        this.visible = false;

        this.app.stage.emit(ButtonEvent.exitButtonClicked);
    }
}
