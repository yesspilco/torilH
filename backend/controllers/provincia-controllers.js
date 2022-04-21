const Provincia =require('../dao/provincia-dao');

var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = '12345678';


exports.createProvincias = (req, res, next) => {
    const newProvincia = [
        { nombreProvincia: 'Azuay' },
        { nombreProvincia: 'Bolívar' },
        { nombreProvincia: 'Cañar' },
        { nombreProvincia: 'Carchi' },
        { nombreProvincia: 'Chimborazo' },
        { nombreProvincia: 'Cotopaxi' },
        { nombreProvincia: 'El Oro' },
        { nombreProvincia: 'Esmeraldas' },
        { nombreProvincia: 'Galápagos' },
        { nombreProvincia: 'Guayas' },
        { nombreProvincia: 'Imbabura' },
        { nombreProvincia: 'Loja' },
        { nombreProvincia: 'Los Ríos' },
        { nombreProvincia: 'Manabí' },
        { nombreProvincia: 'Morona Santiago' },
        { nombreProvincia: 'Napo' },
        { nombreProvincia: 'Orellana' },
        { nombreProvincia: 'Pastaza' },
        { nombreProvincia: 'Pichincha' },
        { nombreProvincia: 'Santa Elena' },
        { nombreProvincia: 'Santo Domingo de los Tsáchilas' },
        { nombreProvincia: 'Sucumbíos' },
        { nombreProvincia: 'Tungurahua' },
        { nombreProvincia: 'Zamora Chinchipe' },
        { nombreProvincia: 'Otra' }
    ]
    Provincia.create(newProvincia, (err, provincia) => {
        if (err) {
            return res.send('error');
        } else {
            res.send('register');
        }
    });
}

exports.listaProvincias = function (req, res) {
    try {
        Provincia.find((err, provincia) => {
            if (err) return res.json(null);
            if (!provincia) {
                return res.json(null);
            } else {

                return res.json(provincia);
            }
        });
    } catch (e) {
        res.json(null);
    }
}
