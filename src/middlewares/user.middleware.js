import bcrypt from "bcrypt";

import { verifyEmail } from "../repositories/user.repository.js";


export async function signupValidation(req, res, next) {
  const { email } = req.body;
  const isValid = await verifyEmail(email);

  try {
    if (isValid.rows.length !== 0) return res.status(409).send("User already exists");

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signinValidation(req, res, next) {
  const { email, password } = req.body;
  const isEmailValid = await verifyEmail(email);

  try {
    if (isEmailValid.rows.length === 0) return res.status(409).send("User doesn't exist");

    const isPasswordValid = bcrypt.compareSync(password, isEmailValid.rows[0].password);
    if (!isPasswordValid) return res.status(401).send("Password does not match");

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}