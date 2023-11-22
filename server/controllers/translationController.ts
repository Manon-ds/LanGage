// @ts-ignore
import { translateToEnglish } from "../deepl/deeplAPI";
import { Request, Response } from "express";

export async function translateText(req: Request, res: Response) {
  try {
    const word = req.body.word;
    const translation = await translateToEnglish(word);
    res.status(200).json(translation.text);
  } catch (e) {
    console.log("Translation call failed:", e);
    res.sendStatus(500).json({ error: "Text translation failed" });
  }
}
