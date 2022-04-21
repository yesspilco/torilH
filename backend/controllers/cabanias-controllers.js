const Cabania = require('../dao/cabanias-dao');
const Tipo = require('../dao/tipos-dao');
const Servicio = require('../dao/servicios-dao');
const ReservacionDet = require('../dao/reservacionDetalle-dao');
const Reservacion = require('../dao/reservacion-dao');
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = '12345678';


exports.registrarCabania = (req, res, next) => {
    try {
        console.log("datos que recibe",req.body);

        const newCabania = {
            tipo: req.body.tipo,
            servicio: req.body.codigo
        }

        console.log("recibe",newCabania);
        Cabania.create(newCabania, (err, user) => {
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

exports.listarCabanias = function (req, res) {
    try {
        Cabania.aggregate([{
                $lookup: {
                    from: 'servicios',
                    localField: 'servicio',
                    foreignField: '_id',
                    as: 'servicio'
                },
            },
            {
                $lookup: {
                    from: 'tipos',
                    localField: 'tipo',
                    foreignField: '_id',
                    as: 'tipos'
                },
            },
            {
                $match: {
                    'servicio.activo': 1
                }
            }
        ]).sort({
            updatedAt: 1
        }).exec(function (err, cabania) {
            if (err) {
                res.send(null);
            } else if (!cabania) {
                res.json(null);
            } else {

                const result = [];
                for (var i = 0; i < cabania.length; i++) {
                    result.push({
                        _id: cabania[i].servicio[0]._id,
                        nombre: cabania[i].servicio[0].nombre,
                        descripcion: cabania[i].servicio[0].descripcion,
                        estado: cabania[i].servicio[0].estado,
                        tipo: cabania[i].tipos[0].nombre,
                        camas: cabania[i].tipos[0].camas,
                        capacidad: cabania[i].tipos[0].capacidad,
                        precio: cabania[i].tipos[0].precio,
                        imagen:cabania[i].servicio[0].imagen,
                    })
                }
                res.send(result);
            }
        });
    } catch (e) {
        res.json(null);
    }
}

exports.cabaniasInactivas = function (req, res) {
    try {
        Cabania.aggregate([{
                $lookup: {
                    from: 'servicios',
                    localField: 'servicio',
                    foreignField: '_id',
                    as: 'servicio'
                },
            },
            {
                $lookup: {
                    from: 'tipos',
                    localField: 'tipo',
                    foreignField: '_id',
                    as: 'tipos'
                },
            },
            {
                $match: {
                    'servicio.activo': 0
                }
            }
        ]).sort({
            updatedAt: 1
        }).exec(function (err, cabania) {
            if (err) {
                res.send(null);
            } else if (!cabania) {
                res.json(null);
            } else {

                const result = [];
                for (var i = 0; i < cabania.length; i++) {
                    result.push({
                        _id: cabania[i].servicio[0]._id,
                        nombre: cabania[i].servicio[0].nombre,
                        descripcion: cabania[i].servicio[0].descripcion,
                        estado: cabania[i].servicio[0].estado,
                        tipo: cabania[i].tipos[0].nombre,
                        camas: cabania[i].tipos[0].camas,
                        capacidad: cabania[i].tipos[0].capacidad,
                        precio: cabania[i].tipos[0].precio,
                        imagen:cabania[i].servicio[0].imagen,
                    })
                }
                res.send(result);
            }
        });
    } catch (e) {
        res.json(null);
    }

}

exports.obtenerCabania = function (req, res) {
    try {
        var id = req.params.id;
        Cabania.find({
            servicio: id
        }, function (err, cabania) {
            Servicio.populate(cabania, {
                path: "servicio"
            }, function (err, cabania) {
                Tipo.populate(cabania, {
                    path: "tipo",
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
        });
    } catch (e) {
        res.json(null);
    }
}

exports.modificarCabania = function (req, res) {
    try {
        var id = req.params.id;
        delete req.body.id
        Cabania.update({
            servicio: id
        }, req.body, function (err, cabania) {
            return res.json(cabania);
        })
    } catch (e) {
        res.json(null);
    }
}


exports.cabaniasDisponiblesActual = function (req, res) {
    try {
        Cabania.aggregate([{
                $lookup: {
                    from: 'servicios',
                    localField: 'servicio',
                    foreignField: '_id',
                    as: 'servicio'
                },
            },
            {
                $lookup: {
                    from: 'tipos',
                    localField: 'tipo',
                    foreignField: '_id',
                    as: 'tipos'
                },
            },
            {
                $match: {
                    $and: [{
                            'servicio.activo': 1
                        },
                        {
                            'servicio.estado': 'disponible'
                        }
                    ]
                }
            }
        ]).sort({
            updatedAt: 1
        }).exec(function (err, cabania) {
            if (err) {
                res.send(null);
            } else if (!cabania) {
                res.json(null);
            } else {

                const result = [];
                for (var i = 0; i < cabania.length; i++) {
                    result.push({
                        _id: cabania[i].servicio[0]._id,
                        nombre: cabania[i].servicio[0].nombre,
                        descripcion: cabania[i].servicio[0].descripcion,
                        estado: cabania[i].servicio[0].estado,
                        tipo: cabania[i].tipos[0].nombre,
                        camas: cabania[i].tipos[0].camas,
                        capacidad: cabania[i].tipos[0].capacidad,
                        precio: cabania[i].tipos[0].precio,
                        idtipo:cabania[i].tipos[0]._id,
                        imagen:cabania[i].servicio[0].imagen,
                    })
                }
                res.send(result);
            }
        });
    } catch (e) {
        res.json(null);
    }
}


exports.cabaniasOcupadasActual = function (req, res) {
    try {
        Cabania.aggregate([{
                $lookup: {
                    from: 'servicios',
                    localField: 'servicio',
                    foreignField: '_id',
                    as: 'servicio'
                },
            },
            {
                $lookup: {
                    from: 'tipos',
                    localField: 'tipo',
                    foreignField: '_id',
                    as: 'tipos'
                },
            },
            {
                $match: {
                    $and: [{
                            'servicio.activo': 1
                        },
                        {
                            'servicio.estado': 'ocupada'
                        }
                    ]
                }
            }
        ]).sort({
            updatedAt: 1
        }).exec(function (err, cabania) {
            if (err) {
                res.send(null);
            } else if (!cabania) {
                res.json(null);
            } else {

                const result = [];
                for (var i = 0; i < cabania.length; i++) {
                    result.push({
                        _id: cabania[i].servicio[0]._id,
                        nombre: cabania[i].servicio[0].nombre,
                        descripcion: cabania[i].servicio[0].descripcion,
                        estado: cabania[i].servicio[0].estado,
                        tipo: cabania[i].tipos[0].nombre,
                        camas: cabania[i].tipos[0].camas,
                        capacidad: cabania[i].tipos[0].capacidad,
                        precio: cabania[i].tipos[0].precio,
                        imagen:cabania[i].servicio[0].imagen,
                    })
                }
                res.send(result);
            }
        });
    } catch (e) {
        res.json(null);
    }
}

exports.cabaniasPorTipo = function (req, res) {
    try {
        var cod = mongoose.Types.ObjectId(req.query.tipo);
        console.log("id del tipo", cod);
        Cabania.aggregate([     
            {
                $match:{tipo:cod}
            },    
            {
                $lookup: {
                    from: 'servicios',
                    localField: 'servicio',
                    foreignField: '_id',
                    as: 'servicio'
                },
            },
            
            {
                $lookup: {
                    from: 'tipos',
                    localField: 'tipo',
                    foreignField: '_id',
                    as: 'tipos'
                },
            },            
            {
                $match: {
                    $and: [{
                            'servicio.activo': 1
                        },
                        {
                            'servicio.estado': 'disponible'
                        }
                    ]
                }
            }
        ]).sort({
            updatedAt: 1
        }).exec(function (err, cabania) {
            if (err) {
                console.log("error en la recuperacion de datos");
                res.send(null);
            } else if (!cabania) {
                console.log("cabanias vacio",cabania);
                res.json(null);
            } else {
                const result = [];
                for (var i = 0; i < cabania.length; i++) {
                    result.push({
                        _id: cabania[i].servicio[0]._id,
                        nombre: cabania[i].servicio[0].nombre,
                        descripcion: cabania[i].servicio[0].descripcion,
                        estado: cabania[i].servicio[0].estado,
                        idTipo: cabania[i].tipos[0]._id,
                        tipo: cabania[i].tipos[0].nombre,
                        camas: cabania[i].tipos[0].camas,
                        capacidad: cabania[i].tipos[0].capacidad,
                        precio: cabania[i].tipos[0].precio,
                        imagen:cabania[i].servicio[0].imagen,
                    })
                }
                res.send(result);
            }
        });
    } catch (e) {
        res.json(null);
    }
}


exports.ActualizarEstadoOcupado = function (req, res) {
    try {
        var dat= new Date();
        var fechaI= req.params.fechaI;
        var fechaF=req.params.fechaF;
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
                        {'reservacion.estado':'Aceptada',    
                        'reserva.Finicio':{ 
                            $lte: fechaI,
                        },
                        'reserva.Ffin':{
                            $gte: fechaF,
                        }
                    }
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


exports.cabaniasDisponiblesAhora = function (req, res) {
    try {
        Cabania.aggregate([
            {
                 $lookup: {
                     from: 'servicios',
                     localField: 'servicio',
                     foreignField: '_id',
                     as: 'servicio'
                 }
             },
             {
                 $lookup: {
                     from: 'tipos',
                     localField: 'tipo',
                     foreignField: '_id',
                     as: 'tipos'
                 }
             },
             {
                 $group: {
                     _id:'$tipos' ,  cabanias: { $push: "$$ROOT" }
                   }
               }, 
         ]).sort({
            updatedAt: 1
        }).exec(function (err, cabania) {
            if (err) {
                res.send(null);
            } else if (!cabania) {
                res.json(null);
            } else {                
                res.json(cabania);
            }
        });
    } catch (e) {
        res.json(null);
    }
}

exports.cabaniasDisponiblesFecha = function (req, res) {
    try {
        var fechai = (req.query.fechai);
        var fechaf = (req.query.fechaf);
        console.log("fecha i", fechai);
        console.log("fecha f", fechaf);
        var fi = new Date(fechai);
        var ff = new Date(fechaf);
        console.log("fi", fi);
        console.log("ff", ff);
        ReservacionDet.aggregate([
            
            {
                $lookup: {
                    from: 'reservacions',
                    localField: 'reserva',
                    foreignField: '_id',
                    as: 'reserva'
                },
            },
            {
                $match:{
                    $and: [{
                        'reserva.estado': 'Aceptada',
                        'reserva.Ffin': {
                            $gte: fi,
                            $lte: ff
                        },
                    }]
                }
            },
        ]).sort({
            updatedAt: 1
        }).exec(function (err, cabania) {
            if (err) {
                res.send(null);
            } else if (!cabania) {
                res.json(null);
            } else {
                res.json(cabania);
            }
        });
    } catch (e) {
        res.json(null);
        console.log("sale por catch");
    }
}

