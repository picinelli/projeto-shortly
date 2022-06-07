import db from '../db.js'

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send("Token nao encontrado");
  const token = authorization.replace("Bearer", "").trim();

  try {
    const sessionSearch = await db.query(
      `SELECT "userId" 
      FROM sessions
      WHERE token = $1
      `, [token])
    const userId = sessionSearch.rows[0]

    if(!userId) {
      return res.sendStatus(401)
    }
    res.locals.userId = userId
  } catch(e) {
    console.log(e, "Erro no validateToken")
    res.sendStatus(500)
  }
  
  next()
}