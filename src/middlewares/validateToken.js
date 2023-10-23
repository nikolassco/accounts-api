const knex = require('../connection');
const jwt = require("jsonwebtoken");

const verifyJwt = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, process.env.JWTKEY);

    const user = await knex('users').where({ id }).first();

    if (!user) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const { password: _, ...userLogged } = user;

    req.user = userLogged;

    next();
  } catch (error) {
    return res.status(401).json({ mensage: 'Não autorizado' });
  }
}

module.exports = verifyJwt
