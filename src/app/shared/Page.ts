import { Service } from "typedi";
import * as PIXI from "pixi.js";

import Application from "../Application";
import LayerManager from "app/managers/LayerManager";

@Service()
export class Page extends PIXI.Container {
    constructor(
        protected app: Application,
        protected layerManager: LayerManager
    ) {
        super();

        this.app.stage.addChild(this);

        this.addBackground();
    }

    protected addBackground(): void {
        const context = document.createElement("canvas").getContext("2d");
        context.canvas.width = this.app.view.width;
        context.canvas.height = this.app.view.height;

        const gradient = context.createLinearGradient(
            0,
            0,
            0,
            context.canvas.height
        );

        gradient.addColorStop(0, "#cccccc");
        gradient.addColorStop(1, "#000000");

        context.fillStyle = gradient;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        const baseTexture = new PIXI.BaseTexture(context.canvas);
        const texture = new PIXI.Texture(baseTexture);

        const sprite = new PIXI.Sprite(texture);

        sprite.parentLayer = this.layerManager.background;

        this.addChild(sprite);
    }
}
