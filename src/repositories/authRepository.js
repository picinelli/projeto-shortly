import db from "../db.js";

async function signUp(name, email, password) {
  return db.query(
    `INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3)`,
    [name, email, password]
  );
}

async function signIn(email) {
  return db.query(
    `SELECT * FROM users WHERE email = $1
    `,
    [email]
  );
}

async function createSession(token, id) {
  return db.query(
    `INSERT INTO sessions (token, "userId")
  VALUES ($1, $2)`,
    [token, id]
  );
}

export const authRepository = {
  signUp,
  signIn,
  createSession
};
