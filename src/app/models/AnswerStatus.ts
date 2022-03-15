import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("AnswerStatus")
export class AnswerStatus {
    @JsonProperty("is_correct")
    isCorrect: boolean = undefined;
}
