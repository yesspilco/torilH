const otroDetalle = require('../dao/otrosdetalles-dao');

var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = '12345678';

exports.crearotroDetalle = (req, res, next) => {

    const newReserva = {
        detalle: req.body.detalle,
        descripcion: req.body.descripcion,
        valorPersona: req.body.vpersona,
        cantidad: req.body.cantidad,
        subtotal: req.body.subtotal
    }
  ReservacionDet.create(newReserva,(err,reserva)=>{
    if(err) {
        res.send(err);
    }else if(!reserva){
        res.json(null);
    }else{
        res.json(reserva)
    }
   });
}
