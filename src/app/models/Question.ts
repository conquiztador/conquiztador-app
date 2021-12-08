import { JsonObject, JsonProperty } from "json2typescript";

import { Answer } from "./Answer";

@JsonObject("Question")
export class Question {
    @JsonProperty("uuid")
    uuid: string = undefined;

    @JsonProperty("url")
    url: string = undefined;

    @JsonProperty("text")
    text: string = undefined;

    @JsonProperty("answers")
    answers: Answer[] = undefined;

    @JsonProperty("updated_at")
    updatedAt: Date = undefined;

    @JsonProperty("created_at")
    createdAt: Date = undefined;
}
