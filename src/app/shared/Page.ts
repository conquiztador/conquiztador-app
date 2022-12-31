import { Service } from "typedi";
import * as PIXI from "pixi.js";

import Application from "../Application";
import LayerManager from "app/managers/LayerManager";

@Service()
export class Page extends PIXI.Container {
    protected background: PIXI.Sprite

    constructor(
        protected app: Application,
        protected layerManager: LayerManager
    ) {
        super();

        this.app.stage.addChild(this);

        this.addBackground();

        // window.addEventListener('resize', () => {
        //     this.redraw()
        // });
    }

    protected addBackground(): void {
        this.background = this.createBackground()

        this.background.parentLayer = this.layerManager.background;

        this.addChild(this.background);
    }

    protected createBackground(): PIXI.Sprite {
        const context = document.createElement("canvas").getContext("2d");
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;

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

        return new PIXI.Sprite(texture);
    }

    protected redraw(): void {
        if (this.background) {
            this.background.parent.removeChild(this.background)
            this.addBackground()
        }
    }
}
