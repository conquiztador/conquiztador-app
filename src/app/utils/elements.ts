import * as PIXI from "pixi.js";

export function createButton(content: string): PIXI.Graphics {
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

    graphics.on("pointerdown", () => {
        graphics.scale.set(0.95);
    });

    graphics.on("pointerupoutside", () => {
        graphics.scale.set(1);
    });

    graphics.on("pointerup", () => {
        graphics.scale.set(1);
    });

    return graphics;
}
