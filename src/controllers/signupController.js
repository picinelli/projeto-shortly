import db from "../db.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

import { authRepository } from "../repositories/authRepository.js";

export async function signup(req, res) {
  const { body } = req;
  body.password = bcrypt.hashSync(body.password, 10);
  const { name, email, password } = body;

  try {
    await authRepository.signUp(name, email, password);
    res.sendStatus(201);
  } catch (e) {
    console.log(e, "Erro no signup");
    res.sendStatus(500);
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;
  try {
    const userSearch = await authRepository.signIn(email);

    const user = userSearch.rows[0];
    const passCheck = bcrypt.compareSync(password, user.password);
    if (!user || !passCheck) return res.sendStatus(401);

    const token = nanoid();
    await authRepository.createSession(token, user.id)

    res.status(200).send(token);
  } catch (e) {
    console.log(e, "Erro no signin");
    return res.sendStatus(500);
  }
}
