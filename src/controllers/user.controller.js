import bcrypt from "bcrypt";

// Repositories
import { createUser, retrieveUserById, verifyEmail } from "../repositories/user.repository.js";
import { searchSession, updateSession, createSession, searchSessionByToken } from "../repositories/sessions.repository.js";
import { selectAllFromSpecificProduct } from "../repositories/products.repository.js";

export async function signup(req, res) {
  const { name, cpf, phone, email, password,  } = req.body;

  try {
    const hash = bcrypt.hashSync(password, 10);

    await createUser({
      name,
      cpf,
      phone,
      email,
      password: hash,
    });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;

  try {
    // Verify if the user has logged before
    // If so then overwrite the current token with the new one
    const userInformation = await verifyEmail(email);
    const hasLogged = await searchSession(userInformation.rows[0].id);
    if (hasLogged.rows.length > 0) {
      const newToken = updateSession(userInformation.rows[0].id);
      return res.status(200).send(newToken);
    }

    const token = await createSession(userInformation.rows[0].id);

    res.status(200).send(token);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function myInfo(req, res) {
  try {
    const query = await searchSessionByToken(res.locals.token);
    const productInfo = await selectAllFromSpecificProduct(query.rows[0].user_id);
    const userInfo = await retrieveUserById(query.rows[0].user_id);

    const result = {
      id: userInfo.rows[0].id,
      name: userInfo.rows[0].name,
      cpf: userInfo.rows[0].cpf,
      phone: userInfo.rows[0].phone,
      email: userInfo.rows[0].email,
      products: productInfo.rows
    };

    res.status(200).send(result)
  } catch (err) {
    res.status(500).send(err.message);
  };
};