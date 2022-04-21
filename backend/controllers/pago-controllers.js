const Pago= require('../dao/pago-dao');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';


var mongoose = require('mongoose');
const date = require('date-and-time');


exports.crearPago =(req,res,next) => {
    
    const newPago = {
        total:req.body.total,
        abono: req.body.abono,
        saldo: req.body.saldo,
        reserva:req.body.reserva,
    }

console.log("datos Pago",newPago);

Pago.create(newPago, (err, user) => {
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


//pago por reserva
exports.obtenerPago = function (req, res) {
    try {
        var reserva = mongoose.Types.ObjectId(req.query.reserva);
        console.log("id reserva",reserva);
        Pago.find({reserva:reserva},function(err, factura) {
            if (err) return res.json(null);
            if (!factura) {
                return res.json(null);
            } else {

                return res.json(factura);
            }
        });
    } catch (e) {
        res.json(null);
    }
}