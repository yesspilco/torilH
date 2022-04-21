const Hosteria= require('../dao/hosteria-dao');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.crearHosteria =(req,res,next) => {
    
    const newHosteria = {
        ruc:'0602301254001',
        nombre: 'El Toril',
        representanten: 'Jorge',
        representantea: 'Erazo',
        direccion: 'Km 1 via a Penipe',
        telefono: '099999999',
        email: 'eltoril@gmail.com',
        iva:  '12',
    }

console.log("datos Hosteria",newHosteria);

Hosteria.create(newHosteria, (err, user) => {
    if (err) {
        console.log(err);
        res.send(null);
    } else if (!user) {
        res.json(null);
    } else {
        res.json(user);
    }
});
}

exports.datosHosteria = function (req, res) {
    try {
        Hosteria.find(function(err, hosteria)  {
            if (err) return res.json(null);
            if (!hosteria) {
                return res.json(null);
            } else {
                return res.json(hosteria);
            }
        });
    } catch (e) {
        res.json(null);
    }
}


exports.obtenerHosteria = function (req, res) {
    try {
        var id = req.params.id;
        Hosteria.find({_id:id},function(err, hosteria)  {
            if (err) return res.json(null);
            if (!hosteria) {
                return res.json(null);
            } else {
                return res.json(hosteria);
            }
        });
    } catch (e) {
        res.json(null);
    }
}
exports.modificarHosteria = function (req, res) {
    try {
        var id = req.params.id;
        delete req.body.id
        Hosteria.update({_id:id},req.body,function(err,hosteria){
            return res.json(hosteria);
        })
    } catch (e) {
        res.json(null);
    }    
} 
