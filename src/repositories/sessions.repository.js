import { v4 as uuid } from "uuid";

import { db } from "../database/database.connection.js";

export function searchSession(userID) {
  return db.query(`SELECT * FROM sessions WHERE user_id=$1`, [userID]);
}

export function updateSession(userID) {
  const newToken = uuid();
  db.query(`UPDATE sessions SET token=$1 WHERE user_id=$2`, [newToken, userID]);
  return newToken;
}

export function createSession(userID) {
  const token = uuid();
  db.query(`INSERT INTO sessions (user_id, token) VALUES ($1, $2);`, [
    userID,
    token,
  ]);
  return token;
}
