import { db } from "../database/database.connection.js";

export function addProductToDb(body, OwnerId) {
  return db.query(
    `INSERT INTO products (product_name, description, price, owner_id, photo_url) VALUES ($1, $2, $3, $4, $5);`,
    [body.product_name, body.description, body.price, OwnerId, body.photo_url]
  );
}

export function getAvailableProducts() {
  return db.query("SELECT * FROM products WHERE selled<>true;")
}