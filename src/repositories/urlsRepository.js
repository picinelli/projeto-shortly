import db from '../db.js'

async function postUrl(userId, url, shortUrl) {
  return db.query(
    `INSERT INTO urls ("userId", url, "shortUrl")
      VALUES ($1, $2, $3)
    `,
    [userId, url, shortUrl]
  );
}

async function getUrl(urlId) {
  return db.query(
    `SELECT id, "shortUrl", "url"
      FROM urls
      WHERE id = $1`,
    [urlId]
  );
}

async function getAndUpdateUrl(shortUrl) {
  return db.query(
    `UPDATE urls
    SET "visitCount" = "visitCount" + 1
    WHERE "shortUrl" = $1
    RETURNING *
    `, [shortUrl]);
}

async function getUrlOwner(userId, urlId) {
  return db.query(
    `SELECT urls."shortUrl", urls."userId", urls.id AS "urlId", users.id
      FROM users
      JOIN urls ON urls."userId" = users.id
      WHERE users.id = $1 AND urls.id = $2
    `,
    [userId, urlId]
  );
}

async function deleteUrl(urlId) {
  return db.query(
    `DELETE FROM urls
    WHERE id = ${urlId}
    `
  );
}

export const urlsRepository = {
  postUrl,
  getUrl,
  getAndUpdateUrl,
  getUrlOwner,
  deleteUrl
}