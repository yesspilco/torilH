const otros = require('../dao/otroservicio-dao');
const Servicio = require('../dao/servicios-dao');

exports.registrarOtroServicio = (req, res, next) => {
    try {
        console.log(req.body);

        const newServicio = {
            servicio: req.body.codigo,
            precio: req.body.precio,
            observacion:req.body.observacion
        }

        otros.create(newServicio, (err, otro) => {
            if (err) {
                console.log(err);
                res.send(null);
            } else if (!otro) {
                res.json(null);
            } else {
                res.json(otro);
            }
        });
    } catch (e) {
        res.json(e);
    }
}

exports.listarOtrosServicios = function (req, res) {
    try {
        otros.aggregate([
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
        }).exec(function (err, otro) {
            if (err) {
                res.send(null);
            } else if (!otro) {
                res.json(null);
            } else {
               const result= [];
               for(var i=0; i<otro.length;i++){
                result.push({
                    _idservicio:otro[i].servicio[0]._id,
                    nombre:otro[i].servicio[0].nombre,
                    descripcion:otro[i].servicio[0].descripcion,
                    estado:otro[i].servicio[0].estado,
                    precio:otro[i].precio,
                    _idotro:otro[i]._id,
                })
               }
               res.send(result);
            }
        });
    } catch (e) {
        res.json(null);
    }

}

exports.obtenerOtroServicio= function (req, res) {
    try {
        var id = req.params.id;
        otros.find({
            servicio: id
        }, function (err, otro) {
            Servicio.populate(otro, {
                path: "servicio"
            }, function (err, otro) {
                if (err) {
                    return res.json(null);
                }
                if (!otro) {
                    return res.json(null);
                } else {
                    return res.json(otro);
                }
            });
        });
    } catch (e) {
        res.json(null);
    }
}

exports.modificarOtroServicio = function (req, res) {
    try {
        var id = req.params.id;
        delete req.body.id
        otros.update({
            servicio: id
        }, req.body, function (err, salon) {
            return res.json(salon);
        })
    } catch (e) {
        res.json(null);
    }
}