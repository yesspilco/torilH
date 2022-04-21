const Factura= require('../dao/factura-dao');
const Reservacion = require('../dao/reservacion-dao');
const Cliente = require('../dao/auth.dao');

var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = '12345678';

exports.crearFactura =(req,res,next) => {
    var fecha = new Date();
    var a = fecha.getFullYear();
    var m = fecha.getMonth();
    var d = fecha.getDate();
    console.log("fecha actual", fecha);
    console.log("año", a);
    console.log("mes", m);
    console.log("dia", d);
    var fech = new Date(a, m, d);
    
    const newFactura = {
        numero:req.body.numero,
        fecha:fech,
        idreserva: req.body.idreserva,
        idcliente:req.body.idcliente,
        subtotal: req.body.subtotal,
        iva: req.body.iva,
        total: req.body.total,
        activo: 1,
        estado:'Pendiente'
    }

console.log("datos Factura",newFactura);

Factura.crear(newFactura, (err, user) => {
    if (err) {
        console.log(err);
        res.send(null);
    } else if (!user) {
        res.json(null);
    } else {
        res.json(user._id);
    }
});
}

exports.listarFacturas = function (req, res) {
    try {
        Factura.aggregate([
            {
                $lookup: {
                    from: 'reservacions',
                    localField: 'idreserva',
                    foreignField: '_id',
                    as: 'reserva'
                },
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'idcliente',
                    foreignField: '_id',
                    as: 'cliente'
                },
            }
        ]).sort({_id:-1}).exec(function (err, factura) {
            if (err) {
                console.log("error en la recuperacion de datos");
                res.send(null);
            } else if (!factura) {
                console.log("conjunto de datos vacio");
                res.json(null);
            } else {
                const result = [];
                for (var i = 0; i < factura.length; i++) {
                    result.push({
                        idfactura:factura[i]._id,
                        idreserva: factura[i].reserva[0]._id,
                        numero: factura[i].numero,
                        subtotal: factura[i].subtotal,
                        iva: factura[i].iva,
                        fecha: factura[i].fecha,
                        total: factura[i].total,
                        nombre:factura[i].cliente[0].nombre,
                        apellido:factura[i].cliente[0].apellido,
                        cedula:factura[i].cliente[0].cedula,
                    })
                }
                res.send(result);
            }
        });

    } catch (e) {
        console.log("sale por catch");
        res.json(null);
    }
}

exports.listarFacturasPagadas = function (req, res) {
    try {
        Factura.find({activo:"1"},{estado:"Pagada"},function(err, factura) {
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

exports.modificarEstadoFactura = function (req, res) {
    try {
        var id = req.params.id;
        delete req.body.id
        Factura.findOneAndUpdate({ _id: id }, { estado: "Pagada" }, function (err, factura) {
            return res.json(factura);
        })
    } catch (e) {
        res.json(null);
    }    
} 

exports.facturasPorId = function (req, res) {
    try {
        var id = mongoose.Types.ObjectId(req.query.factura);
        console.log("id de la reserva", id);
        Factura.aggregate([
            {
                $match:{
                    idreserva:id
                }
            },
            {
                $lookup: {
                    from: 'reservacions',
                    localField: 'idreserva',
                    foreignField: '_id',
                    as: 'reserva'
                },
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'idcliente',
                    foreignField: '_id',
                    as: 'cliente'
                },
            }
        ]).exec(function (err, factura) {
            if (err) {
                console.log("error en la recuperacion de datos");
                res.send(null);
            } else if (!factura) {
                console.log("conjunto de datos vacio");
                res.json(null);
            } else {
                const result = [];
                for (var i = 0; i < factura.length; i++) {
                    result.push({
                        idfactura:factura[i]._id,
                        idreserva: factura[i].reserva[0]._id,
                        numero: factura[i].numero,
                        subtotal: factura[i].subtotal,
                        iva: factura[i].iva,
                        fecha: factura[i].fecha,
                        total: factura[i].total,
                        dias:factura[i].reserva[0].dias,
                        nombre:factura[i].cliente[0].nombre,
                        apellido:factura[i].cliente[0].apellido,
                        cedula:factura[i].cliente[0].cedula,
                        direccion:factura[i].cliente[0].direccion,
                        telefono:factura[i].cliente[0].telefono,
                    })
                }
                res.send(result);
            }
        });

    } catch (e) {
        console.log("sale por catch");
        res.json(null);
    }
}
exports.facturasPorCliente = function (req, res) {
    try {
        var id = mongoose.Types.ObjectId(req.query.cliente);
        console.log("id cliente",id);
        Factura.aggregate([
            {
                $match:{
                    idcliente:id
                }
            },
            {
                $lookup: {
                    from: 'reservacions',
                    localField: 'idreserva',
                    foreignField: '_id',
                    as: 'reserva'
                },
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'idcliente',
                    foreignField: '_id',
                    as: 'cliente'
                },
            }
        ]).exec(function (err, factura) {
            if (err) {
                console.log("error en la recuperacion de datos");
                res.send(null);
            } else if (!factura) {
                console.log("conjunto de datos vacio");
                res.json(null);
            } else {
                const result = [];
                for (var i = 0; i < factura.length; i++) {
                    result.push({
                        idfactura:factura[i]._id,
                        idreserva: factura[i].reserva[0]._id,
                        numero: factura[i].numero,
                        subtotal: factura[i].subtotal,
                        iva: factura[i].iva,
                        fecha: factura[i].fecha,
                        total: factura[i].total,
                        dias:factura[i].reserva[0].dias,
                        nombre:factura[i].cliente[0].nombre,
                        apellido:factura[i].cliente[0].apellido,
                        cedula:factura[i].cliente[0].cedula,
                        direccion:factura[i].cliente[0].direccion,
                        telefono:factura[i].cliente[0].telefono,
                    })
                }
                res.send(result);
            }
        });

    } catch (e) {
        console.log("sale por catch");
        res.json(null);
    }
}

exports.ultimaFactura = function (req, res) {
    try{
        Factura.find({}).sort({$natural:-1}).limit(1).exec(function (err, factura) {
            if (err) {
                console.log("error en la recuperacion de datos");
                res.send(null);
            } else if (!factura) {
                console.log("conjunto de datos vacio");
                res.json(null);
            } else {
                res.json(factura);
            }
        });
    }catch (e) {
        console.log("sale por catch");
        res.json(null);
    }

}

exports.facturasPorFechas = function (req, res) {
    try {
        var fechai = (req.query.fechai);
        var fechaf = (req.query.fechaf);
        console.log("fecha i", fechai);
        console.log("fecha f", fechaf);
        var fi = new Date(fechai);
        var ff = new Date(fechaf);
        console.log("fi", fi);
        console.log("ff", ff);
        Factura.aggregate([
            {
                $match: {
                    $and: [{
                        activo: 1,
                        fecha: {
                            $gte: fi,
                            $lte: ff
                        }
                    }]
                }
            },
            {
                $lookup: {
                    from: 'reservacions',
                    localField: 'idreserva',
                    foreignField: '_id',
                    as: 'reserva'
                },
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'idcliente',
                    foreignField: '_id',
                    as: 'cliente'
                },
            }
        ]).sort({_id:-1}).exec(function (err, factura) {
            if (err) {
                console.log("error en la recuperacion de datos");
                res.send(null);
            } else if (!factura) {
                console.log("conjunto de datos vacio");
                res.json(null);
            } else {
                const result = [];
                for (var i = 0; i < factura.length; i++) {
                    result.push({
                        idfactura:factura[i]._id,
                        idreserva: factura[i].reserva[0]._id,
                        numero: factura[i].numero,
                        subtotal: factura[i].subtotal,
                        iva: factura[i].iva,
                        fecha: factura[i].fecha,
                        total: factura[i].total,
                        nombre:factura[i].cliente[0].nombre,
                        apellido:factura[i].cliente[0].apellido,
                        cedula:factura[i].cliente[0].cedula,
                    })
                }
                res.send(result);
            }
        });

    } catch (e) {
        console.log("sale por catch");
        res.json(null);
    }
}