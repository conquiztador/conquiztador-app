import { Service } from "typedi";

@Service()
export class ScoreService {
    private _score = 0;

    get score(): number {
        return this._score;
    }

    reset(): void {
        this._score = 0;
    }

    increaseScore(increment = 1): void {
        this._score += increment;
    }
}
