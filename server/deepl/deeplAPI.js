const { deeplApiK } = require('../config')

const deepl = require('deepl-node');
const translator = new deepl.Translator(deeplApiK);

async function translateToEnglish(input) {
  const result = await translator.translateText(input, 'es', 'en-US');
  return result;
}

module.exports = { translateToEnglish }