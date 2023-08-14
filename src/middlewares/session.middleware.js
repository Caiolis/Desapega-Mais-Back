import { searchSessionByToken } from "../repositories/sessions.repository.js";

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("You are not allowed to do this");

  try {
    const session = await searchSessionByToken(token);
    if (session.rows.length === 0) return res.status(401).send("You are not allowed to do this");

    res.locals.token = token;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}