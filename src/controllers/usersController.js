import db from "../db.js";

export async function getUserId(req, res) {
  const userId = req.params.id;
  try {
    const userInfoSearch = await db.query(
      `SELECT json_build_object(
        'id', u.id,
        'name', u.name,
        'visitCount', COALESCE(SUM(urls."visitCount"), 0),
        'shortenedUrls', json_build_array(
          array_agg(json_build_object(
            'id', urls.id,
            'shortUrl', urls."shortUrl",
            'url', urls.url,
            'visitCount', urls."visitCount"
          ))
        )
      )
      FROM users u
      LEFT JOIN urls ON u.id = urls."userId"
      WHERE u.id = $1
      GROUP BY u.id
      `,
      [userId]
    );
    if (!userInfoSearch.rows[0]) {
      return res.sendStatus(404);
    }
    const userInfo = userInfoSearch.rows[0].json_build_object;

    //verifica se o usuário possui urls criadas, se não, retorna array vazio
    if (!userInfo.shortenedUrls[0][0].id) {
      userInfo.shortenedUrls = [];
    } else {
      userInfo.shortenedUrls = userInfo.shortenedUrls[0];
    }

    return res.status(200).send(userInfo);
  } catch (e) {
    console.log(e, "Erro no getUserId");
    return res.sendStatus(500);
  }
}

export async function getUsersRanking(req, res) {
  try {
    const usersInfoSearch = await db.query(
      `SELECT 
      users.id, 
      users.name, 
      COUNT(urls.url) AS "linksCount", 
      COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
      FROM users
      LEFT JOIN urls ON users.id = urls."userId"
      GROUP BY users.id
      ORDER BY "visitCount" DESC
      LIMIT 10
      `
    );

    return res.status(200).send(usersInfoSearch.rows);
  } catch (e) {
    console.log(e, "Erro no getUsersRanking");
    return res.sendStatus(500);
  }
}
