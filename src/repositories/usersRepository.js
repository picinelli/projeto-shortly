import db from '../db.js'

async function getUser(userId) {
  return db.query(
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
}

async function getUsersRanking() {
  return db.query(
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
}

export const usersRepository = {
  getUser,
  getUsersRanking
}