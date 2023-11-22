var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import OpenAI from "openai";
import config from "../config.js";
import prompt from './systemPromp.js';
const openai = new OpenAI({
    apiKey: config.apiK,
});
const systemPrompt = prompt;
function main(userMessage, prevMessages) {
    return __awaiter(this, void 0, void 0, function* () {
        const chatCompletion = yield openai.chat.completions.create({
            messages: [
                ...prevMessages,
                { role: "system", content: systemPrompt },
                userMessage,
            ],
            // model: "gpt-4-1106-preview",
            model: 'gpt-3.5-turbo',
            temperature: 0,
        });
        return chatCompletion.choices[0];
    });
}
export default { main };
