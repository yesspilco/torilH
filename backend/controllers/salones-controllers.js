const Salones = require('../dao/salones-dao');
const Servicio = require('../dao/servicios-dao');

exports.registrarSalones = (req, res, next) => {
    try {
        console.log(req.body);

        const newSalon = {
            servicio: req.body.codigo,
            capacidad: req.body.capacidad,
            precio: req.body.precio
        }

        Salones.create(newSalon, (err, user) => {
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

exports.listarSalones = function (req, res) {
    try {
        Salones.aggregate([
            { 
                $lookup: {
                    from: 'servicios',
                    localField: 'servicio',
                    foreignField: '_id',
                    as: 'servicio'
                },                
            },
            {$match:{'servicio.activo': 1 }}
        ]).sort({
            updatedAt: 1
        }).exec(function (err, salon) {
            if (err) {
                res.send(null);
            } else if (!salon) {
                res.json(null);
            } else {
               const result= [];
               for(var i=0; i<salon.length;i++){
                result.push({
                    _id:salon[i].servicio[0]._id,
                    nombre:salon[i].servicio[0].nombre,
                    descripcion:salon[i].servicio[0].descripcion,
                    imagen:salon[i].servicio[0].imagen,
                    estado:salon[i].servicio[0].estado,
                    capacidad:salon[i].capacidad,
                    precio:salon[i].precio,
                })
               }
               res.send(result);
            }
        });
    } catch (e) {
        res.json(null);
    }

}

exports.obtenerSalon = function (req, res) {
    try {
        var id = req.params.id;
        Salones.find({
            servicio: id
        }, function (err, salon) {
            Servicio.populate(salon, {
                path: "servicio"
            }, function (err, salon) {
                if (err) {
                    return res.json(null);
                }
                if (!salon) {
                    return res.json(null);
                } else {
                    return res.json(salon);
                }
            });
        });
    } catch (e) {
        res.json(null);
    }
}

exports.modificarSalon = function (req, res) {
    try {
        var id = req.params.id;
        delete req.body.id
        Salones.update({
            servicio: id
        }, req.body, function (err, salon) {
            return res.json(salon);
        })
    } catch (e) {
        res.json(null);
    }
}

exports.salonesDisponiblesActual = function (req, res) {
    try {
        Salones.aggregate([
            { 
                $lookup: {
                    from: 'servicios',
                    localField: 'servicio',
                    foreignField: '_id',
                    as: 'servicio'
                },                
            },
            {$match:{
                $and: [
                    {'servicio.activo': 1 },
                    {'servicio.estado':'disponible'}
                ]
            }
            }
        ]).sort({
            updatedAt: 1
        }).exec(function (err, salon) {
            if (err) {
                res.send(null);
            } else if (!salon) {
                res.json(null);
            } else {
               const result= [];
               for(var i=0; i<salon.length;i++){
                result.push({
                    _id:salon[i].servicio[0]._id,
                    nombre:salon[i].servicio[0].nombre,
                    descripcion:salon[i].servicio[0].descripcion,
                    estado:salon[i].servicio[0].estado,
                    imagen:salon[i].servicio[0].imagen,
                    capacidad:salon[i].capacidad,
                    precio:salon[i].precio,
                    idsalon:salon[i]._id,
                })
               }
               res.send(result);
            }
        });
    } catch (e) {
        res.json(null);
    }

}


exports.salonesOcupadosActual = function (req, res) {
    try {
        Salones.aggregate([
            { 
                $lookup: {
                    from: 'servicios',
                    localField: 'servicio',
                    foreignField: '_id',
                    as: 'servicio'
                },                
            },
            {$match:{
                $and: [
                    {'servicio.activo': 1 },
                    {'servicio.estado':'ocupada'}
                ]
            }
            }
        ]).sort({
            updatedAt: 1
        }).exec(function (err, salon) {
            if (err) {
                res.send(null);
            } else if (!salon) {
                res.json(null);
            } else {
               const result= [];
               for(var i=0; i<salon.length;i++){
                result.push({
                    _id:salon[i].servicio[0]._id,
                    nombre:salon[i].servicio[0].nombre,
                    descripcion:salon[i].servicio[0].descripcion,
                    imagen:salon[i].servicio[0].imagen,
                    estado:salon[i].servicio[0].estado,
                    capacidad:salon[i].capacidad,
                    precio:salon[i].precio,
                })
               }
               res.send(result);
            }
        });
    } catch (e) {
        res.json(null);
    }

}


exports.salonesInactivos = function (req, res) {
    try {
        Salones.aggregate([
            { 
                $lookup: {
                    from: 'servicios',
                    localField: 'servicio',
                    foreignField: '_id',
                    as: 'servicio'
                },                
            },
            {$match:{
                $and: [
                    {'servicio.activo': 0 },
                ]
            }
            }
        ]).sort({
            updatedAt: 1
        }).exec(function (err, salon) {
            if (err) {
                res.send(null);
            } else if (!salon) {
                res.json(null);
            } else {
               const result= [];
               for(var i=0; i<salon.length;i++){
                result.push({
                    _id:salon[i].servicio[0]._id,
                    nombre:salon[i].servicio[0].nombre,
                    descripcion:salon[i].servicio[0].descripcion,
                    imagen:salon[i].servicio[0].imagen,
                    estado:salon[i].servicio[0].estado,
                    capacidad:salon[i].capacidad,
                    precio:salon[i].precio,
                })
               }
               res.send(result);
            }
        });
    } catch (e) {
        res.json(null);
    }

}