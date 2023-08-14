import { db } from "../database/database.connection.js";

export function verifyEmail(email) {
  return db.query("SELECT * FROM users WHERE email=$1;", [email]);
};

export function createUser(body) {
  return db.query(
    `INSERT INTO users (name, cpf, phone, email, password) VALUES ($1, $2, $3, $4, $5)`,
    [body.name, body.cpf, body.phone, body.email, body.password]
  );
}

export function selectUserId(id) {
  return db.query(`SELECT owner_id FROM products WHERE id=$1;`, [id]);
}

export function retrieveUserById(id) {
  return db.query(`SELECT * FROM users WHERE id=$1;`, [id]);
}