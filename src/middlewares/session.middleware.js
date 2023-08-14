import { searchSessionByToken } from "../repositories/sessions.repository.js";
import { selectUserId } from "../repositories/user.repository.js";

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

export async function validateAdmin(req, res, next) {
  try {
    const query = await selectUserId(req.params.id);
    const session = await searchSessionByToken(res.locals.token);

    if (query.rows[0].owner_id !== session.rows[0].user_id)
      return res.status(401).send("You are not allowed to do this");

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}