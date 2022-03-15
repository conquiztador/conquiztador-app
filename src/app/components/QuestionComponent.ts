import { Service } from "typedi";
import * as PIXI from "pixi.js";

import Application from "../Application";
import { QuestionService } from "services/QuestionService";
import { Question } from "app/models/Question";
import { createButton } from "app/utils/elements";
import { GameEvent } from "app/Events";

@Service()
export class QuestionComponent extends PIXI.Container {
    private _isValidationInProgress: boolean;

    constructor(
        private app: Application,
        private questionService: QuestionService
    ) {
        super();
    }

    async loadQuestion(): Promise<Question> {
        const question = await this.questionService.readRandomQuestion();

        this.removeChildren();

        this.addQuestionText(question);
        this.addQuestionAnswers(question);

        return question;
    }

    private addQuestionText(question: Question) {
        const questionText = new PIXI.Text(question.text, {
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

    private addQuestionAnswers(question: Question) {
        const positions = [
            { x: this.app.center.x - 175, y: this.app.center.y - 100 },
            { x: this.app.center.x + 175, y: this.app.center.y - 100 },
            { x: this.app.center.x - 175, y: this.app.center.y },
            { x: this.app.center.x + 175, y: this.app.center.y },
        ];

        for (let index = 0; index < question.answers.length; index++) {
            const answer = question.answers[index];
            const button = createButton(answer.text);

            const position = positions[index];

            button.position.set(position.x, position.y);

            this.addChild(button);

            button.on(
                "pointerup",
                async () => {
                    if (this._isValidationInProgress) {
                        return;
                    }

                    this._isValidationInProgress = true;
                    const response = await this.questionService.validateAnswer(
                        question,
                        index
                    );

                    this.app.stage.emit(GameEvent.answerSelected, {
                        isCorrect: response.isCorrect,
                    });

                    this._isValidationInProgress = false;
                },
                this
            );
        }
    }
}
