const ReservacionDet = require('../dao/reservacionDetalle-dao');
const Reservacion = require('../dao/reservacion-dao');
const Servicio = require('../dao/servicios-dao');
const Cabania = require('../dao/cabanias-dao');
const Tipo = require('../dao/tipos-dao');

var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = '12345678';



exports.crearReservacionDetalle = (req, res, next) => {

    const newReserva = {
        reserva: req.body.reserva,
        servicio: req.body.servicio,
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
        res.json(reserva._id)
    }
   });
}

exports.cambiarEstadoServicio = function (req, res) {
    try {
        var dat= new Date();
        
        ReservacionDet.aggregate([
            {
                $lookup: {
                        from: 'servicio',
                        localField: 'servicio',
                        foreignField: '_id',
                        as: 'servicio'
                }
            },
            {
                $lookup: {
                        from: 'reservacion',
                        localField: 'reservacion',
                        foreignField: '_id',
                        as: 'reservacion'
                }
            },
            {$match:
                {
                    $and : [
                        {'reservacion.estado':'Aceptada'},  
                        { dat : {$gte:'fechaInicio', $lte:'fechaFin' }}
                    ]
                }
            }
    ]).exec(function (err, cabania) {
        if (err) {
            res.send(null);
        } else if (!cabania) {
            res.json(null);
        } else {    
            Servicio.update({estado:"Ocupada"}, function(err,cabania){
                if (err) {
                    res.send(null);
                } else if (!cabania) {
                    res.json(null);
                }
                else{
                    res.json(cabania);
                }
            });          
        }
    });
    } catch (e) {
        res.json(null);
    }
}

//obtener detalle de la reservaciond dado el id
exports.obtenerDetalleReservacion = function (req, res) {
    try {
        var id = mongoose.Types.ObjectId(req.query.idreserva);
        console.log("id de la reserva", id);
        ReservacionDet.aggregate([     
            {
                $match:{reserva:id}
            },    
            {
                $lookup: {
                    from: 'reservacions',
                    localField: 'reserva',
                    foreignField: '_id',
                    as: 'reserva'
                },
            },
             {
                $lookup: {
                    from: 'servicios',
                    localField: 'servicio',
                    foreignField: '_id',
                    as: 'servicio'
                },
                
            },
            
        ]).sort({
            updatedAt: 1
        }).exec(function (err, detalle) {
            if (err) {
                console.log("error en la recuperacion de datos");
                res.send(null);
            } else if (!detalle) {
                console.log("conjunto de datos vacio");
                res.json(null);
            } else {
                const result = [];
                for (var i = 0; i < detalle.length; i++) {
                    result.push({
                        _idreserva: detalle[i].reserva[0]._id,
                        valorPersona: detalle[i].valorPersona,
                        cantidad: detalle[i].cantidad,
                        subtotal: detalle[i].subtotal,
                        fechaF: detalle[i].reserva[0].Ffin,
                        fechaI: detalle[i].reserva[0].Finicio,
                        fechaR: detalle[i].reserva[0].fechaR,
                        total: detalle[i].reserva[0].total,
                        dias:detalle[i].reserva[0].dias,
                        idservicio:detalle[i].servicio[0]._id,
                        nombre:detalle[i].servicio[0].nombre,
                        estado:detalle[i].servicio[0].estado,
                    })
                }
                res.send(result);
            }
        });
    } catch (e) {
        res.json(null);
    }
}
