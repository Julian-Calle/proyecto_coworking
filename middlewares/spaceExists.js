const getDB = require("../db");
const { createError } = require("../helpers");
const spaceExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { space_id } = req.params;

    const [space] = await connection.query(
      `
      SELECT ID FROM spaces WHERE ID=?
    `,
      [space_id]
    );
    //console.log(space);
    if (space.length === 0) {
      throw createError("Esta espacio no existe", 404);
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = spaceExists;
