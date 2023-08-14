// Repositories
import { searchSessionByToken } from "../repositories/sessions.repository.js";
import { addProductToDb } from "../repositories/products.repository.js";

export async function addProduct(req, res) {
  try {
    const getOwnerId = await searchSessionByToken(res.locals.token);
    const query = addProductToDb(req.body, getOwnerId.rows[0].user_id);

    res.status(201).send("Product added successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

