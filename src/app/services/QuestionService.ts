import { Service } from "typedi";
import axios from "axios";
import { JsonConvert } from "json2typescript";

import { environment } from "src/environments/environment";
import { Question } from "models/Question";
import { AnswerStatus } from "models/AnswerStatus";

@Service()
export class QuestionService {
    async readRandomQuestion(): Promise<Question> {
        const response = await axios.get(
            `${environment.apiUrl}/questions/get-random/`
        );
        const jsonConvert = new JsonConvert();

        return jsonConvert.deserialize(response.data, Question) as Question;
    }

    async validateAnswer(
        question: Question,
        answerIndex: number
    ): Promise<AnswerStatus> {
        const response = await axios.post(
            `${environment.apiUrl}/questions/${question.uuid}/validate-answer/`,
            { uuid: question.answers[answerIndex].uuid }
        );

        const jsonConvert = new JsonConvert();

        return jsonConvert.deserialize(
            { is_correct: false },
            AnswerStatus
        ) as AnswerStatus;
    }
}
