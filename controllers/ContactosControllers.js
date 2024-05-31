const ContactosModel = require ("../models/ContactosModel");
//const nodemailer = require ('nodemailer');
//const IP = require ('ip');
const request = require ('request');
class ContactosController {
    constructor() {
        this.ContacModel = new ContactosModel();
        this.add = this.add.bind(this); 
    }

    async add(req, res) {
        console.log(req.body);
        if (!req.body.email || !req.body.name || !req.body.mensaje || !req.body.cell) {
            res.status(400).send("Ingrese los datos completos deje la flojera");
            return;
        }
        const fecha = new Date().toLocaleDateString('en-us', {weekday:"long", year:"numeric", month:"short", day:"numeric"})
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        let myIP = ip.split(",")[0];
        const country = "";
        request(`http://ip-api.com/json/${myIP}`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            country = data.country;
            //Mostrar datos ingresados pos consola
            console.log({country});
          
            }});
       

        console.log(req.body.email, req.body.name, req.body.mensaje, req.body.cell, ip, fecha, country);
        await this.ContacModel.crearDatos(
            req.body.email,
            req.body.name,
            req.body.mensaje,
            req.body.cell,
            ip,
            fecha,
            country
        );

        const datos = await this.ContacModel.obtenerAllDatos();
        console.log(datos);
        res.redirect("/");
    }
}

module.exports = ContactosController;