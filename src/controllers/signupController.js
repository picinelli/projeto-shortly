import db from "../db.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid"

export async function signup(req, res) {
  const { body } = req;
  body.password = bcrypt.hashSync(body.password, 10);
  const {name, email, password} = body

  try {
    await db.query(
      `INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3)`, [name, email, password]);

    res.sendStatus(201)
  } catch(e) {
    console.log(e, "Erro no signup")
    res.sendStatus(500)
  }
}

export async function signin(req, res) {
  const { body } = req;
  const {email, password} = body

  try {
    const userSearch = await db.query(
      `SELECT * FROM users WHERE email = $1
      `, [email])
    const user = userSearch.rows[0]
    const passCheck = bcrypt.compareSync(password, user.password);

    if(!user || !passCheck) {
      return res.sendStatus(401)
    }

    const token = nanoid()

    await db.query(
    `INSERT INTO sessions (token, "userId")
    VALUES ($1, $2)`, [token, user.id])

    res.status(200).send(token)

  } catch(e) {
    console.log(e, "Erro no signin")
    return res.sendStatus(500)
  }
}
