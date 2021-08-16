import { Service } from "typedi";
import * as PIXI from "pixi.js";

import Application from "../Application";
import { ButtonEvent } from "../Events";

@Service()
export class GamePage extends PIXI.Container {
    private _exitButton: PIXI.Graphics;

    constructor(private app: Application) {
        super();

        this.app.stage.addChild(this);
        this.visible = false;

        this.addQuestion();
        this.addButtons();

        this.attachListeners();
    }

    private addQuestion() {
        const question = new PIXI.Text("Lorem ipsum dolor sit amet?", {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: 24,
            fill: 0xffffff,
            align: "center",
        });

        this.addChild(question);

        question.anchor.set(0.5, 0.5);
        question.position.set(this.app.center.x, 100);
    }

    private addButtons() {
        const answerAButton = this.createButton("Answer A");

        answerAButton.position.set(
            this.app.center.x - 175,
            this.app.center.y - 100
        );

        this.addChild(answerAButton);

        const answerBButton = this.createButton("Answer B");

        answerBButton.position.set(
            this.app.center.x + 175,
            this.app.center.y - 100
        );

        this.addChild(answerBButton);

        const answerCButton = this.createButton("Answer C");

        answerCButton.position.set(this.app.center.x - 175, this.app.center.y);

        this.addChild(answerCButton);

        const answerDButton = this.createButton("Answer D");

        answerDButton.position.set(this.app.center.x + 175, this.app.center.y);

        this.addChild(answerDButton);

        this._exitButton = this.createButton("Exit");

        this._exitButton.position.set(
            this.app.center.x,
            this.app.center.y + 300
        );

        this.addChild(this._exitButton);
    }

    private createButton(content: string): PIXI.Graphics {
        const graphics = new PIXI.Graphics();

        graphics.beginFill(0x32a852);
        graphics.lineStyle(2, 0xcccccc);
        graphics.drawRoundedRect(0, 0, 300, 50, 10);
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
            ButtonEvent.newGameButtonClicked,
            this.onNewGameButtonClicked,
            this
        );
        this._exitButton.on("pointerup", this.onExitButtonClicked, this);
    }

    private onNewGameButtonClicked() {
        this.visible = true;
    }

    private onExitButtonClicked() {
        this.visible = false;

        this.app.stage.emit(ButtonEvent.exitButtonClicked);
    }
}
