import { Service } from "typedi";
import * as PIXI from "pixi.js";

import Application from "../Application";

@Service()
export class ScoreComponent extends PIXI.Container {
    private _score = 0;
    private _scoreText: PIXI.Text;

    constructor(private app: Application) {
        super();

        this.addScore();
    }

    addScore(): void {
        this._scoreText = new PIXI.Text(`${this._score}`, {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: 24,
            fill: 0xffffff,
            align: "center",
        });

        this.addChild(this._scoreText);

        this._scoreText.anchor.set(1, 0);
        this._scoreText.position.set(
            this.app.view.width - this._scoreText.width,
            10
        );
    }

    resetScore(): void {
        this._score = 0;
        this._scoreText.text = "0";
    }

    increaseScore(increment = 1): void {
        this._score += increment;
        this._scoreText.text = `${this._score}`;
    }
}
