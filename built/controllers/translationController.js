const { translateToEnglish } = require("../deepl/deeplAPI.js");
async function translateText(req, res) {
    try {
        const word = req.body.word;
        const translation = await translateToEnglish(word);
        res.status(200).json(translation.text);
    }
    catch (e) {
        console.log("Translation call failed:", e);
        res.sendStatus(500).json({ error: "Text translation failed" });
    }
}
module.exports = { translateText };
