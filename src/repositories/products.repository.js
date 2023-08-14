import { db } from "../database/database.connection.js";

export function addProductToDb(body, OwnerId) {
  return db.query(
    `INSERT INTO products (product_name, description, price, owner_id, photo_url) VALUES ($1, $2, $3, $4, $5);`,
    [body.product_name, body.description, body.price, OwnerId, body.photo_url]
  );
};

export function getAvailableProducts() {
  return db.query(
    "SELECT products.id, name, product_name, price, photo_url FROM products JOIN users on products.owner_id = users.id WHERE selled<>true;"
  );
};

export function getSpecificProduct(id) {
  return db.query("SELECT products.*, name, phone, email FROM products JOIN users on products.owner_id = users.id WHERE products.id=$1;", [id]);
};

export function markProductAsSelled(id) {
  return db.query("UPDATE products SET selled=true WHERE id=$1;", [id]);
};

export function selectAllFromSpecificProduct(id) {
  return db.query("SELECT * FROM products WHERE id=$1;", [id]);
}