const ReservaTemp = require('../dao/reservaTemp-dao');
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = '12345678';


mongoose.set('useCreateIndex',true);

exports.reservaTemp = (req, res, next) => {
    try {
        console.log("datos que recibe",req.body);
        const newReserva = {
            idservicio: req.body.idservicio,
            nombre: req.body.nombre,
            tipo: req.body.tipo,
            precio: req.body.precio,
            huespedes: req.body.huespedes,
            subtotal: req.body.subtotal,
            idcabania: req.body.idcabania,
            idtipo: req.body.idtipo,
            dias:req.body.dias
        }

        console.log("newReserva",newReserva);
        
        ReservaTemp.create(newReserva, (err, user) => {
            if (err) {
                console.log(err);
                res.send(null);
            } else if (!user) {
                res.json(null);
            } else {
                res.json(user);
            }
        });
    } catch (e) {
        res.json(e);
    }
}

exports.listarReservaTemp = function (req, res) {
    try {
        ReservaTemp.find({ activo: "1" },function (err, reserva) {
             if (err) {
                res.send(null);
            } else if (!reserva) {
                res.json(null);
            } else {

                const result = [];
                for (var i = 0; i < reserva.length; i++) {
                    result.push({
                        _id:reserva[i]._id,
                        idservicio: reserva[i].idservicio,
                        nombre: reserva[i].nombre,
                        tipo: reserva[i].tipo,
                        precio: reserva[i].precio,
                        huespedes: reserva[i].huespedes,
                        subtotal: reserva[i].subtotal,
                        idcabania: reserva[i].idcabania,
                        idtipo: reserva[i].idtipo,
                        dias:reserva[i].dias
                    })
                }
                res.send(result);
            }
        });
    } catch (e) {
        res.json(null);
    }
}

exports.EliminarReservaTemp = function (req, res) {
    try {
         ReservaTemp.remove({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                res.end('success');
            }
        }
    );
    } catch (e) {
        res.json(null);
    }
}

exports.quitarReservaTemp = function (req, res) {
    try {
        var id = req.params.id;
       console.log(id);
       ReservaTemp.remove({ _id: id }, function (err, reserva) {
                    if (err) return res.json(null)
                    if (!reserva) {
                        return res.json(null);
                    } else {
                        console.log("Estado de la reserva modificado");
                        res.json(1);
                    }
                });
            
    } catch (e) {
        res.json(null);
    }
}

exports.verificarRepetido = function (req, res) {
    try {
        var id = req.params.id;
       console.log(id);
       ReservaTemp.findOne({ idservicio: id }, { activo: "1" }, function (err, reserva) {
                    if (err) return res.json(null)
                    if (!reserva) {
                        return res.json(null);
                    } else {
                        console.log("dato encontrado");
                        res.json(1);
                    }
                });
            
    } catch (e) {
        res.json(null);
    }
}