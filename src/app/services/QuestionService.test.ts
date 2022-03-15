import { describe, it, expect, jest } from "@jest/globals";
import axios from "axios";
import { JsonConvert } from "json2typescript";

import { Question } from "app/models/Question";
import { AnswerStatus } from "app/models/AnswerStatus";
import { QuestionService } from "./QuestionService";
import { environment } from "src/environments/environment";

jest.mock("axios");

const jsonConvert = new JsonConvert();

describe("fetchData", () => {
    it("Should read random question", async () => {
        const service = new QuestionService();
        const date = new Date();

        const questionData = {
            url: "/api/questions/question-uuid",
            uuid: "question-uuid",
            text: "Lorem ipsum dolor sit amet",
            answers: [
                {
                    uuid: "answer-uuid",
                    text: "Answer text",
                    updated_at: date.toISOString(),
                    created_at: date.toISOString(),
                },
            ],
            updated_at: date.toISOString(),
            created_at: date.toISOString(),
        };

        const jsonConvert = new JsonConvert();

        const expectedResult = jsonConvert.deserialize(questionData, Question);

        const response = {
            data: questionData,
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (axios.get as any).mockImplementationOnce(() =>
            Promise.resolve(response)
        );

        const result = await service.readRandomQuestion();

        expect(result).toEqual(expectedResult);

        expect(axios.get).toHaveBeenCalledWith(
            `${environment.apiUrl}/questions/get-random/`
        );
    });

    it("Should validate answer", async () => {
        const service = new QuestionService();

        const answerStatusData = {
            is_correct: true,
        };

        const expectedResult = jsonConvert.deserialize(
            answerStatusData,
            AnswerStatus
        );

        const response = {
            data: answerStatusData,
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (axios.post as any).mockImplementationOnce(() =>
            Promise.resolve(response)
        );

        const questionStub = {
            uuid: "question-uuid",
            answers: [
                {
                    uuid: "answer-uuid",
                },
            ],
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await service.validateAnswer(questionStub as any, 0);

        expect(result).toEqual(expectedResult);

        expect(
            axios.post
        ).toHaveBeenCalledWith(
            `${environment.apiUrl}/questions/${questionStub.uuid}/validate-answer/`,
            { uuid: questionStub.answers[0].uuid }
        );
    });
});
