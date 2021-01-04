const getDB = require("../../db");

const editReport = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { id_report } = req.params;

    //Ejecutamos la edición en la base de datos
    await connection.query(
      `
      UPDATE reports r1, reports r2 
      SET r1.solved = IF(r2.solved = 0, 1,0)     
      WHERE r1.id = r2.id and r1.id = ?;

    `,
      [id_report]
    );

    const [
      result,
    ] = await connection.query(`SELECT * FROM  reports WHERE id = ?;`, [
      id_report,
    ]);

    res.send({
      status: "ok",
      data: {
        ...result["0"],
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editReport;
