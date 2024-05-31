const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");

class ContactosModel {
  constructor() {
    this.db = new sqlite3.Database("./database/datosnuevos.db", (err) => {
      if (err) {
        console.error(err.message);
        return
      }
      console.log("Se ha completado la función 'Ingresado en la base de datos SQLite'.");
    });

    this.db.run(
      "CREATE TABLE IF NOT EXISTS datos (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, nombre TEXT, mensaje TEXT, teléfono NUMBER, ip TEXT, fecha TEXT, country TEXT)",
      (err) => {
        if (err) {
          console.error(err.message);
        }
      }
    );
  }

  crearDatos(email, nombre, mensaje, telefono, ip, fecha, country) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO datos (email, nombre, mensaje, telefono, ip, fecha, country) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      this.db.run(sql, [email, nombre, mensaje, telefono, ip, fecha, country], function (err) {
        if (err) {
          console.error(err.message);
          reject(err);
        }
        console.log(`ID ${this.lastID}`);
        resolve(this.lastID);
      });
    });
  }
  async obtenerDatos(email) {
    const sql = `SELECT * FROM datos WHERE email = ?`;
    const get = promisify(this.db.get).bind(this.db);
    return await get(sql, [email]);
  }

  async obtenerAllDatos() {
    const sql = `SELECT * FROM datos`;
    const all = promisify(this.db.all).bind(this.db);
    return await all(sql);
  }

  
}


module.exports = ContactosModel;

