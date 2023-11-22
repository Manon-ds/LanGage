var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
import translateToEnglish  from "../deepl/deeplAPI.js";
function translateText(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const word = req.body.word;
            const translation = yield translateToEnglish(word);
            res.status(200).json(translation.text);
        }
        catch (e) {
            console.log("Translation call failed:", e);
            res.sendStatus(500).json({ error: "Text translation failed" });
        }
    });
}
export { translateText };
