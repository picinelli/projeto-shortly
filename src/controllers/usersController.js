import db from '../db.js'

export async function getUserId(req, res) {
  const userId = req.params.id
  try{
    const userInfoSearch = await db.query(
      `SELECT json_build_object(
        'id', u.id,
        'name', u.name,
        'visitCount', SUM(urls."visitCount"),
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
      JOIN urls ON u.id = urls."userId"
      WHERE u.id = $1
      GROUP BY u.id
      `, [userId])
      
      if(!userInfoSearch.rows[0]) {
        return res.sendStatus(404)
      }

      const buildObject = userInfoSearch.rows[0].json_build_object
      buildObject.shortenedUrls = buildObject.shortenedUrls[0]

      return res.status(200).send(userInfoSearch.rows[0].json_build_object)
  } catch(e) {
    console.log(e, "Erro no getUserId")
    return res.sendStatus(500)
  }
}