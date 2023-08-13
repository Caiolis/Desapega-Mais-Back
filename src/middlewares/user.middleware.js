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

