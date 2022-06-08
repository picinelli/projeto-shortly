import db from "../db.js";
import { nanoid } from "nanoid";

export async function postUrl(req, res) {
  const user = res.locals.userId;
  const { url } = req.body;
  const shortUrl = nanoid(8);

  try {
    await db.query(
      `INSERT INTO urls ("userId", url, "shortUrl")
        VALUES ($1, $2, $3)
      `,
      [user.userId, url, shortUrl]
    );

    return res.status(201).send({ shortUrl });
  } catch (e) {
    console.log(e, "Erro no postUrl");
    return res.sendStatus(500);
  }
}

export async function getUrl(req, res) {
  const urlId = req.params.id;

  try {
    const searchUrl = await db.query(
      `SELECT id, "shortUrl", "url"
        FROM urls
        WHERE id = $1`,
      [urlId]
    );

    const url = searchUrl.rows[0];
    if (!url) {
      return res.sendStatus(404);
    }

    return res.status(200).send(url);
  } catch (e) {
    console.log(e, "Erro no getUrl");
    return res.sendStatus(500);
  }
}

export async function openUrl(req, res) {
  const shortUrl = req.params.shortUrl;

  try {
    const urlSearchAndUpdate = await db.query(
      `UPDATE urls
      SET "visitCount" = "visitCount" + 1
      WHERE "shortUrl" = $1
      RETURNING *
      `, [shortUrl]);
    const urlData = urlSearchAndUpdate.rows[0]
    if (!urlData) {
      return res.sendStatus(404);
    }
    console.log(urlData.url)
    return res.redirect(200, urlData.url)
  } catch (e) {
    console.log(e, "Erro no openUrl");
    return res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  const urlId = req.params.id
  const userData = res.locals.userId;

  try {
    const userSearch = await db.query(
      `SELECT urls."shortUrl", urls."userId", urls.id AS "urlId", users.id
        FROM users
        JOIN urls ON urls."userId" = users.id
        WHERE users.id = $1 AND urls.id = $2
      `, [userData.userId, urlId])
    const urlData = userSearch.rows[0]

    if(!urlData) {
      return res.sendStatus(404)
    }
    if(urlData.userId !== urlData.id) {
      return res.sendStatus(401)
    }

    await db.query(
      `DELETE FROM urls
      WHERE id = ${urlData.urlId}
      `)

    return res.sendStatus(204)
  } catch(e) {
    console.log(e, "Erro no deleteUrl")
    return res.sendStatus(500)
  }
}
