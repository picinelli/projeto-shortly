import db from "../db.js";
import { nanoid } from "nanoid";

export async function postUrl(req, res) {
  const user = res.locals.userId;
  const { url } = req.body;
  const shortUrl = nanoid();

  try {
    await db.query(
      `INSERT INTO urls ("userId", url, "shortUrl")
      VALUES ($1, $2, $3)
      `,
      [user.userId, url, shortUrl]
    );

    res.status(201).send({shortUrl})
  } catch (e) {
    console.log(e, "Erro no postUrl");
    res.sendStatus(500);
  }
}
