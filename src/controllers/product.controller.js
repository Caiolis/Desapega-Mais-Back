// Repositories
import { searchSessionByToken } from "../repositories/sessions.repository.js";
import { addProductToDb, getAvailableProducts, getSpecificProduct } from "../repositories/products.repository.js";

export async function addProduct(req, res) {
  try {
    const getOwnerId = await searchSessionByToken(res.locals.token);
    const query = addProductToDb(req.body, getOwnerId.rows[0].user_id);

    res.status(201).send("Product added successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export async function getAllProducts(req, res) {
  try {
    const query = await getAvailableProducts();

    res.status(200).send(query.rows);
  } catch (err) {
    res.status(500).send(err.message);
  };
};

export async function getProductById(req, res) {
  const { id } = req.params;

  try {
    const query = await getSpecificProduct(id);

    return res.status(200).send(query.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};