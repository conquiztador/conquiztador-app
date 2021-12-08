import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("Answer")
export class Answer {
    @JsonProperty("uuid")
    uuid: string = undefined;

    @JsonProperty("text")
    text: string = undefined;

    @JsonProperty("updated_at")
    updatedAt: Date = undefined;

    @JsonProperty("created_at")
    createdAt: Date = undefined;
}
