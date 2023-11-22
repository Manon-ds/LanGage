const { deeplApiK } = require("../config");
//TODO Remove 'any' type
const deepl = require("deepl-node");
const translator = new deepl.Translator(deeplApiK);

async function translateToEnglish(input: any) {
  const result = await translator.translateText(input, "es", "en-US");
  return result;
}

module.exports = { translateToEnglish };
