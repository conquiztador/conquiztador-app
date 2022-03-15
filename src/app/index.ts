import "reflect-metadata";

import * as PIXI from "pixi.js";
import { Container } from "typedi";

import { MenuPage } from "./pages/MenuPage";
import { GamePage } from "./pages/GamePage";
import { EndGamePage } from "./pages/EndGamePage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).PIXI = PIXI;

const loader = PIXI.Loader.shared;

loader
    .add("assets/white-square.jpg")
    .add("assets/red-square.jpg")
    .add("assets/green-square.jpg")
    .add("assets/blue-square.jpg")
    .load(setup);

function setup() {
    Container.get(MenuPage);
    Container.get(GamePage);
    Container.get(EndGamePage);
}
