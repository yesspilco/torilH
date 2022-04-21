const Reservacion = require('../dao/reservacion-dao');
const detReservacion = require('../dao/reservacionDetalle-dao');
const Cliente = require('../dao/auth.dao');

var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = '12345678';
const date = require('date-and-time');


exports.crearReservacion = (req, res, next) => {

    const newReservacion = {
        fechaR: req.body.fechaR,
        Finicio: req.body.Finicio,
        Ffin: req.body.Ffin,
        cliente: req.body.cliente,
        total: req.body.total,
        dias: req.body.dias,
        observacion: req.body.observacion
    }

    console.log("reservacion", newReservacion);

    Reservacion.create(newReservacion, (err, reserva) => {
        if (err) {
            res.send(err);
        } else if (!reserva) {
            res.json(null);
        } else {
            res.json(reserva._id)
            console.log("reserva realizada", reserva._id);
        }
    });
}

//reservacion por id
exports.reservaPorId = function (req, res) {
    try {
        var cod = mongoose.Types.ObjectId(req.query.reserva);
        console.log("id de la reserva", cod);

        Reservacion.aggregate([{
                $match: {
                    _id: cod
                },
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'cliente',
                    foreignField: '_id',
                    as: 'cliente'
                },
            }
        ]).sort({
            updatedAt: 1
        }).exec(function (err, reserva) {
            if (err) {
                res.send(null);
                console.log("error en la recuperacion de datos");
            } else if (!reserva) {
                res.json(null);
                console.log("conjunto vacio");
            } else {

                const result = [];
                for (var i = 0; i < reserva.length; i++) {
                    result.push({
                        idreserva: reserva[i]._id,
                        idcliente: reserva[i].cliente[0]._id,
                        nombre: reserva[i].cliente[0].nombre,
                        apellido: reserva[i].cliente[0].apellido,
                        telefono: reserva[i].cliente[0].telefono,
                        direccion: reserva[i].cliente[0].direccion,
                        email: reserva[i].cliente[0].email,
                        cedula: reserva[i].cliente[0].cedula,
                        provincia: reserva[i].cliente[0].provincia,
                        fechaR: reserva[i].fechaR,
                        estado: reserva[i].estado,
                        total: reserva[i].total,
                        fechai: reserva[i].Finicio,
                        fechaf: reserva[i].Ffin,
                        dias: reserva[i].dias,
                        observacion: reserva[i].observacion
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

//reservacion por cliente
exports.reservaPorCliente = function (req, res) {
    try {
        var cod = mongoose.Types.ObjectId(req.query.cliente);
        console.log("id del cliente", cod);
        Reservacion.aggregate([{
                $match: {
                    cliente: cod
                }
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'cliente',
                    foreignField: '_id',
                    as: 'cliente'
                },
            }
        ]).sort({
            _id: -1
        }).exec(function (err, cabania) {
            if (err) {
                console.log("error en la recuperacion de datos");
                res.send(null);
            } else if (!cabania) {
                console.log("cabanias vacio", cabania);
                res.json(null);
            } else {
                const result = [];
                for (var i = 0; i < cabania.length; i++) {
                    result.push({
                        idreserva: cabania[i]._id,
                        idcliente: cabania[i].cliente[0]._id,
                        nombre: cabania[i].cliente[0].nombre,
                        apellido: cabania[i].cliente[0].apellido,
                        telefono: cabania[i].cliente[0].telefono,
                        email: cabania[i].cliente[0].email,
                        cedula: cabania[i].cliente[0].cedula,
                        provincia: cabania[i].cliente[0].provincia,
                        fechaR: cabania[i].fechaR,
                        estado: cabania[i].estado,
                        total: cabania[i].total,
                        fechai: cabania[i].fechai,
                        fechaf: cabania[i].fechaf,
                        dias: cabania[i].dias,
                        observacion: cabania[i].observacion
                    })
                }
                res.send(result);
            }
        });
    } catch (e) {
        console.log("sale por el catch");
        res.json(null);
    }
}

exports.reservaClientePendiente = function (req, res) {
    try {
        var id = req.params.id;
        Reservacion.find({
            cliente: id,
            activo: 1,
            estado: 'Pendiente'
        }, function (err, cabania) {
            Cliente.populate(cabania, {
                path: "cliente"
            }, function (err, cabania) {
                if (err) {
                    return res.json(null);
                }
                if (!cabania) {
                    return res.json(null);
                } else {
                    return res.json(cabania);
                }
            });
        });
    } catch (e) {
        res.json(null);
    }
}

exports.reservaClienteAceptada = function (req, res) {
    try {
        var id = req.params.id;
        Reservacion.find({
            cliente: id,
            activo: 1,
            estado: 'Aceptada'
        }, function (err, cabania) {
            Cliente.populate(cabania, {
                path: "cliente"
            }, function (err, cabania) {
                if (err) {
                    return res.json(null);
                }
                if (!cabania) {
                    return res.json(null);
                } else {
                    return res.json(cabania);
                }
            });
        });
    } catch (e) {
        res.json(null);
    }
}

exports.reservacionesPendientes = function (req, res) {
    try {
        Reservacion.aggregate([{
                $match: {
                    activo: 1,
                    estado: 'Pendiente'
                },
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'cliente',
                    foreignField: '_id',
                    as: 'cliente'
                },
            }
        ]).sort({
            _id: -1
        }).exec(function (err, reserva) {
            if (err) {
                res.send(null);
                console.log("error en la recuperacion de datos");
            } else if (!reserva) {
                res.json(null);
                console.log("conjunto vacio");
            } else {

                const result = [];
                for (var i = 0; i < reserva.length; i++) {
                    result.push({
                        idreserva: reserva[i]._id,
                        idcliente: reserva[i].cliente[0]._id,
                        nombre: reserva[i].cliente[0].nombre,
                        apellido: reserva[i].cliente[0].apellido,
                        telefono: reserva[i].cliente[0].telefono,
                        direccion: reserva[i].cliente[0].direccion,
                        email: reserva[i].cliente[0].email,
                        cedula: reserva[i].cliente[0].cedula,
                        provincia: reserva[i].cliente[0].provincia,
                        fechaR: reserva[i].fechaR,
                        estado: reserva[i].estado,
                        total: reserva[i].total,
                        fechai: reserva[i].Finicio,
                        fechaf: reserva[i].Ffin,
                        dias: reserva[i].dias,
                        observacion: reserva[i].observacion
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

exports.reservacionesAceptadas = function (req, res) {
    try {
        Reservacion.aggregate([{
                $match: {
                    activo: 1,
                    estado: 'Aceptada'
                },
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'cliente',
                    foreignField: '_id',
                    as: 'cliente'
                },
            }
        ]).sort({
            _id: -1
        }).exec(function (err, reserva) {
            if (err) {
                res.send(null);
                console.log("error en la recuperacion de datos");
            } else if (!reserva) {
                res.json(null);
                console.log("conjunto vacio");
            } else {

                const result = [];
                for (var i = 0; i < reserva.length; i++) {
                    result.push({
                        idreserva: reserva[i]._id,
                        idcliente: reserva[i].cliente[0]._id,
                        nombre: reserva[i].cliente[0].nombre,
                        apellido: reserva[i].cliente[0].apellido,
                        telefono: reserva[i].cliente[0].telefono,
                        direccion: reserva[i].cliente[0].direccion,
                        email: reserva[i].cliente[0].email,
                        cedula: reserva[i].cliente[0].cedula,
                        provincia: reserva[i].cliente[0].provincia,
                        fechaR: reserva[i].fechaR,
                        estado: reserva[i].estado,
                        total: reserva[i].total,
                        fechai: reserva[i].Finicio,
                        fechaf: reserva[i].Ffin,
                        dias: reserva[i].dias,
                        observacion: reserva[i].observacion
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

exports.reservacionesCanceladas = function (req, res) {
    try {
        Reservacion.aggregate([{
                $match: {
                    activo: 1,
                    estado: 'Cancelada'
                },
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'cliente',
                    foreignField: '_id',
                    as: 'cliente'
                },
            }
        ]).sort({
            _id: -1
        }).exec(function (err, reserva) {
            if (err) {
                res.send(null);
                console.log("error en la recuperacion de datos");
            } else if (!reserva) {
                res.json(null);
                console.log("conjunto vacio");
            } else {

                const result = [];
                for (var i = 0; i < reserva.length; i++) {
                    result.push({
                        idreserva: reserva[i]._id,
                        idcliente: reserva[i].cliente[0]._id,
                        nombre: reserva[i].cliente[0].nombre,
                        apellido: reserva[i].cliente[0].apellido,
                        telefono: reserva[i].cliente[0].telefono,
                        direccion: reserva[i].cliente[0].direccion,
                        email: reserva[i].cliente[0].email,
                        cedula: reserva[i].cliente[0].cedula,
                        provincia: reserva[i].cliente[0].provincia,
                        fechaR: reserva[i].fechaR,
                        estado: reserva[i].estado,
                        total: reserva[i].total,
                        fechai: reserva[i].Finicio,
                        fechaf: reserva[i].Ffin,
                        dias: reserva[i].dias,
                        observacion: reserva[i].observacion
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


exports.reservacionesRealizadas = function (req, res) {
    try {
        Reservacion.aggregate([{
                $match: {
                    activo: 1,
                    estado: 'Realizada'
                },
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'cliente',
                    foreignField: '_id',
                    as: 'cliente'
                },
            }
        ]).sort({
            _id: -1
        }).exec(function (err, reserva) {
            if (err) {
                res.send(null);
                console.log("error en la recuperacion de datos");
            } else if (!reserva) {
                res.json(null);
                console.log("conjunto vacio");
            } else {

                const result = [];
                for (var i = 0; i < reserva.length; i++) {
                    result.push({
                        idreserva: reserva[i]._id,
                        idcliente: reserva[i].cliente[0]._id,
                        nombre: reserva[i].cliente[0].nombre,
                        apellido: reserva[i].cliente[0].apellido,
                        telefono: reserva[i].cliente[0].telefono,
                        direccion: reserva[i].cliente[0].direccion,
                        email: reserva[i].cliente[0].email,
                        cedula: reserva[i].cliente[0].cedula,
                        provincia: reserva[i].cliente[0].provincia,
                        fechaR: reserva[i].fechaR,
                        estado: reserva[i].estado,
                        total: reserva[i].total,
                        fechai: reserva[i].Finicio,
                        fechaf: reserva[i].Ffin,
                        dias: reserva[i].dias,
                        observacion: reserva[i].observacion
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

exports.confirmarReserva = function (req, res) {
    try {
        var id = req.params.id;
        delete req.body.id
        Reservacion.update({
            _id: id
        }, {
            estado: "Aceptada"
        }, req.body, function (err, reserva) {
            return res.json(reserva);
        })
    } catch (e) {
        res.json(null);
    }
}

exports.cancelarReserva = function (req, res) {
    try {
        var id = req.params.id;
        Reservacion.update({
            _id: id
        }, {
            estado: "Cancelada"
        }, req.body, function (err, reserva) {
            return res.json(reserva);
        })
    } catch (e) {
        res.json(null);
    }
}


//clientes con reservaciones pendientes


exports.clientesReservaPendiente = function (req, res) {
    try {
        Reservacion.aggregate([

            {
                $match: {
                    activo: 1,
                    estado: 'Pendiente'
                },
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'cliente',
                    foreignField: '_id',
                    as: 'cliente'
                },
            },

        ]).sort({
            updatedAt: 1
        }).exec(function (err, reserva) {
            if (err) {
                res.send(null);
                console.log("error en la recuperacion de datos");
            } else if (!reserva) {
                res.json(null);
                console.log("conjunto vacio");
            } else {

                const result = [];
                for (var i = 0; i < reserva.length; i++) {
                    result.push({
                        idreserva: reserva[i]._id,
                        _id: reserva[i].cliente[0]._id,
                        nombre: reserva[i].cliente[0].nombre,
                        apellido: reserva[i].cliente[0].apellido,
                        telefono: reserva[i].cliente[0].telefono,
                        direccion: reserva[i].cliente[0].direccion,
                        email: reserva[i].cliente[0].email,
                        cedula: reserva[i].cliente[0].cedula,
                        provincia: reserva[i].cliente[0].provincia,
                        fechaR: reserva[i].fechaR,
                        estado: reserva[i].estado,
                        total: reserva[i].total,
                        fechai: reserva[i].Finicio,
                        fechaf: reserva[i].Ffin,
                        dias: reserva[i].dias,
                        observacion: reserva[i].observacion
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

exports.clientesReservaAceptada = function (req, res) {
    try {
        Reservacion.aggregate([{
                $match: {
                    activo: 1,
                    estado: 'Aceptada'
                },
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'cliente',
                    foreignField: '_id',
                    as: 'cliente'
                },
            }
        ]).sort({
            _id: -1
        }).exec(function (err, reserva) {
            if (err) {
                res.send(null);
                console.log("error en la recuperacion de datos");
            } else if (!reserva) {
                res.json(null);
                console.log("conjunto vacio");
            } else {

                const result = [];
                for (var i = 0; i < reserva.length; i++) {
                    result.push({
                        idreserva: reserva[i]._id,
                        _id: reserva[i].cliente[0]._id,
                        nombre: reserva[i].cliente[0].nombre,
                        apellido: reserva[i].cliente[0].apellido,
                        telefono: reserva[i].cliente[0].telefono,
                        direccion: reserva[i].cliente[0].direccion,
                        email: reserva[i].cliente[0].email,
                        cedula: reserva[i].cliente[0].cedula,
                        provincia: reserva[i].cliente[0].provincia,
                        fechaR: reserva[i].fechaR,
                        estado: reserva[i].estado,
                        total: reserva[i].total,
                        fechai: reserva[i].Finicio,
                        fechaf: reserva[i].Ffin,
                        dias: reserva[i].dias,
                        observacion: reserva[i].observacion
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
exports.clientesReservaCancelada = function (req, res) {
    try {
        Reservacion.aggregate([{
                $match: {
                    activo: 1,
                    estado: 'Cancelada'
                },
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'cliente',
                    foreignField: '_id',
                    as: 'cliente'
                },
            }
        ]).sort({
            _id: -1
        }).exec(function (err, reserva) {
            if (err) {
                res.send(null);
                console.log("error en la recuperacion de datos");
            } else if (!reserva) {
                res.json(null);
                console.log("conjunto vacio");
            } else {

                const result = [];
                for (var i = 0; i < reserva.length; i++) {
                    result.push({
                        idreserva: reserva[i]._id,
                        _id: reserva[i].cliente[0]._id,
                        nombre: reserva[i].cliente[0].nombre,
                        apellido: reserva[i].cliente[0].apellido,
                        telefono: reserva[i].cliente[0].telefono,
                        direccion: reserva[i].cliente[0].direccion,
                        email: reserva[i].cliente[0].email,
                        cedula: reserva[i].cliente[0].cedula,
                        provincia: reserva[i].cliente[0].provincia,
                        fechaR: reserva[i].fechaR,
                        estado: reserva[i].estado,
                        total: reserva[i].total,
                        fechai: reserva[i].Finicio,
                        fechaf: reserva[i].Ffin,
                        dias: reserva[i].dias,
                        observacion: reserva[i].observacion
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

exports.clientesReservaRealizada = function (req, res) {
    try {

        Reservacion.aggregate([{
                $match: {
                    activo: 1,
                    estado: 'Aceptada',

                },
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'cliente',
                    foreignField: '_id',
                    as: 'cliente'
                },
            },
        ]).sort({
            _id: -1
        }).exec(function (err, reserva) {
            if (err) {
                res.send(null);
                console.log("error en la recuperacion de datos");
            } else if (!reserva) {
                res.json(null);
                console.log("conjunto vacio");
            } else {

                const result = [];
                for (var i = 0; i < reserva.length; i++) {
                    result.push({
                        idreserva: reserva[i]._id,
                        _id: reserva[i].cliente[0]._id,
                        nombre: reserva[i].cliente[0].nombre,
                        apellido: reserva[i].cliente[0].apellido,
                        telefono: reserva[i].cliente[0].telefono,
                        direccion: reserva[i].cliente[0].direccion,
                        email: reserva[i].cliente[0].email,
                        cedula: reserva[i].cliente[0].cedula,
                        provincia: reserva[i].cliente[0].provincia,
                        fechaR: reserva[i].fechaR,
                        estado: reserva[i].estado,
                        total: reserva[i].total,
                        fechai: reserva[i].Finicio,
                        fechaf: reserva[i].Ffin,
                        dias: reserva[i].dias,
                        observacion: reserva[i].observacion
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

exports.ReservaHoy = function (req, res) {
    try {
        var fecha = new Date();
        var a = fecha.getFullYear();
        var m = fecha.getMonth();
        var d = fecha.getDate();
        console.log("fecha actual", fecha);
        console.log("año", a);
        console.log("mes", m);
        console.log("dia", d);
        var fech = new Date(a, m, d);
        console.log("otra fecha", fech);
        Reservacion.aggregate([{
                $match: {
                    $and: [{
                        activo: 1,
                        estado: 'Aceptada',
                        Ffin: {
                            $lte: fech,
                        },
                        Finicio: {
                            $gte: fech,
                        }
                    }]
                }
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'cliente',
                    foreignField: '_id',
                    as: 'cliente'
                },
            },
        ]).sort({
            updatedAt: 1
        }).exec(function (err, reserva) {
            if (err) {
                res.send(null);
                console.log("error en la recuperacion de datos");
            } else if (!reserva) {
                res.json(null);
                console.log("conjunto vacio");
            } else {
                const result = [];
                for (var i = 0; i < reserva.length; i++) {
                    result.push({
                        idreserva: reserva[i]._id,
                        _id: reserva[i].cliente[0]._id,
                        nombre: reserva[i].cliente[0].nombre,
                        apellido: reserva[i].cliente[0].apellido,
                        telefono: reserva[i].cliente[0].telefono,
                        direccion: reserva[i].cliente[0].direccion,
                        email: reserva[i].cliente[0].email,
                        cedula: reserva[i].cliente[0].cedula,
                        provincia: reserva[i].cliente[0].provincia,
                        fechaR: reserva[i].fechaR,
                        estado: reserva[i].estado,
                        total: reserva[i].total,
                        fechai: reserva[i].Finicio,
                        fechaf: reserva[i].Ffin,
                        dias: reserva[i].dias,
                        observacion: reserva[i].observacion
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


exports.cambiarEstadoRealizada = function (req, res) {
    try {
        var id = req.params.id;
        delete req.body.id
        Reservacion.findOneAndUpdate({
            _id: id
        }, {
            estado: "Realizada"
        }, function (err, factura) {
            return res.json(factura);
        })
    } catch (e) {
        res.json(null);
    }
}

exports.ReservaPorFechas = function (req, res) {
    try {
        var fechai = (req.query.fechai);
        var fechaf = (req.query.fechaf);
        console.log("fecha i", fechai);
        console.log("fecha f", fechaf);
        var fi = new Date(fechai);
        var ff = new Date(fechaf);
        console.log("fi", fi);
        console.log("ff", ff);
        Reservacion.aggregate([{
                $match: {
                    $and: [{
                        activo: 1,
                        Finicio: {
                            $gte: fi,
                            $lte: ff
                        }
                    }]
                }
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'cliente',
                    foreignField: '_id',
                    as: 'cliente'
                },
            },
        ]).sort({
            _id: -1
        }).exec(function (err, reserva) {
            if (err) {
                res.send(null);
                console.log("error en la recuperacion de datos");
            } else if (!reserva) {
                res.json(null);
                console.log("conjunto vacio");
            } else {
                const result = [];
                for (var i = 0; i < reserva.length; i++) {
                    result.push({
                        idreserva: reserva[i]._id,
                        _id: reserva[i].cliente[0]._id,
                        nombre: reserva[i].cliente[0].nombre,
                        apellido: reserva[i].cliente[0].apellido,
                        telefono: reserva[i].cliente[0].telefono,
                        direccion: reserva[i].cliente[0].direccion,
                        email: reserva[i].cliente[0].email,
                        cedula: reserva[i].cliente[0].cedula,
                        provincia: reserva[i].cliente[0].provincia,
                        fechaR: reserva[i].fechaR,
                        estado: reserva[i].estado,
                        total: reserva[i].total,
                        fechai: reserva[i].Finicio,
                        fechaf: reserva[i].Ffin,
                        dias: reserva[i].dias,
                        observacion: reserva[i].observacion
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

exports.listarReservaciones = function (req, res) {
    try {
        Reservacion.aggregate([{
                $match: {
                    activo: 1
                },
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'cliente',
                    foreignField: '_id',
                    as: 'cliente'
                },
            }
        ]).sort({
            _id: -1
        }).exec(function (err, reserva) {
            if (err) {
                res.send(null);
                console.log("error en la recuperacion de datos");
            } else if (!reserva) {
                res.json(null);
                console.log("conjunto vacio");
            } else {

                const result = [];
                for (var i = 0; i < reserva.length; i++) {
                    result.push({
                        idreserva: reserva[i]._id,
                        idcliente: reserva[i].cliente[0]._id,
                        nombre: reserva[i].cliente[0].nombre,
                        apellido: reserva[i].cliente[0].apellido,
                        telefono: reserva[i].cliente[0].telefono,
                        direccion: reserva[i].cliente[0].direccion,
                        email: reserva[i].cliente[0].email,
                        cedula: reserva[i].cliente[0].cedula,
                        provincia: reserva[i].cliente[0].provincia,
                        fechaR: reserva[i].fechaR,
                        estado: reserva[i].estado,
                        total: reserva[i].total,
                        fechai: reserva[i].Finicio,
                        fechaf: reserva[i].Ffin,
                        dias: reserva[i].dias,
                        observacion: reserva[i].observacion
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


//reservaciones futuras
exports.ReservaFuturo = function (req, res) {
    try {
        var fecha = new Date();
        var a = fecha.getFullYear();
        var m = fecha.getMonth();
        var d = fecha.getDate();
        console.log("fecha actual", fecha);
        console.log("año", a);
        console.log("mes", m);
        console.log("dia", d);
        var fech = new Date(a, m, d);
        console.log("otra fecha", fech);
        Reservacion.aggregate([{
                $match: {
                    $and: [{
                        activo: 1,
                        estado: 'Aceptada',
                        Finicio: {
                            $gte: fech,
                        }
                    }]
                }
            },
            {
                $lookup: {
                    from: 'clientes',
                    localField: 'cliente',
                    foreignField: '_id',
                    as: 'cliente'
                },
            },
        ]).sort({
            updatedAt: 1
        }).exec(function (err, reserva) {
            if (err) {
                res.send(null);
                console.log("error en la recuperacion de datos");
            } else if (!reserva) {
                res.json(null);
                console.log("conjunto vacio");
            } else {
                const result = [];
                for (var i = 0; i < reserva.length; i++) {
                    result.push({
                        idreserva: reserva[i]._id,
                        _id: reserva[i].cliente[0]._id,
                        nombre: reserva[i].cliente[0].nombre,
                        apellido: reserva[i].cliente[0].apellido,
                        telefono: reserva[i].cliente[0].telefono,
                        direccion: reserva[i].cliente[0].direccion,
                        email: reserva[i].cliente[0].email,
                        cedula: reserva[i].cliente[0].cedula,
                        provincia: reserva[i].cliente[0].provincia,
                        fechaR: reserva[i].fechaR,
                        estado: reserva[i].estado,
                        total: reserva[i].total,
                        fechai: reserva[i].Finicio,
                        fechaf: reserva[i].Ffin,
                        dias: reserva[i].dias,
                        observacion: reserva[i].observacion
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


//reservaciones por provincia
exports.reservacionesProvincia = function (req, res) {
    try {
    Cliente.aggregate([{
                $match: {
                    activo: 1
                },
            },
            {
                $lookup: {
                    from: 'reservacions',
                    localField: 'cliente',
                    foreignField: '_id',
                    as: 'reserva'
                },
            },
            {"$group" : {_id:"$provincia", number:{$sum:1}}}
            //{ $sortByCount: "$provincia" }
        ]).sort({
            _id: -1
        }).exec(function (err, reserva) {
            if (err) {
                res.send(null);
                console.log("error en la recuperacion de datos");
            } else if (!reserva) {
                res.json(null);
                console.log("conjunto vacio");
            } else {
                console.log("datos");
                res.json(reserva);
            }
        });
    } catch (e) {
        console.log("sale por catch");
        res.json(null);
    }

}