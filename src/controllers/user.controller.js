import bcrypt from "bcrypt";

// Repositories
import { createUser } from "../repositories/user.repository.js";

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