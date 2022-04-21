const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

module.exports = () => {
  mongoose.connect(dbURL, { useNewUrlParser: true })
    .then(() => console.log(`Base de datos conectada ${dbURL}`))
    .catch(err => console.log(`Error en la conexion ${err}`))

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(`Base de datos desconectada`);
      process.exit(0)
    });
  });
}