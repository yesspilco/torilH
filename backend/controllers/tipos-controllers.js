const Tipo = require('../dao/tipos-dao');
const Cabania = require('../dao/cabanias-dao');
const Servicio = require('../dao/servicios-dao');
const ImagenT = require('../dao/imgtipos-dao');

exports.registrarTipo = (req, res, next) => {

    const newTipo = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        camas: req.body.camas,
        capacidad: req.body.capacidad,
        imagen: req.body.imgproducto,
    }

    Tipo.crear(newTipo, (err, tipo) =>{
        if(err) {
            res.send(null);
        }else if(!tipo){
            res.json(null);
        }else{
            res.json(tipo._id);
        }
    })
}

//guardar imagen tipo
exports.createImgTipo = (req, res, next) => {
    try {
        const newImagen = {
            tipo: req.body.id,
            imagen: req.body.imgproducto,
            estado: 1
        }
        console.log("Imagen del producto",newImagen)
        ImgProducto.create(newImagen, (err, user) => {
            if (err) return res.json(null);
            if (!user) {
                return res.json(null);
            }
            else {
                res.json(1);
            }
        });
    } catch (e) {
        res.json(null);
    }
}

exports.listarTipos = function (req, res) {
    try {
        Tipo.find({ activo: "1" }, function (err, tipo) {
            if (err) return res.json(null);
            if (!tipo) {
                return res.json(null);
            } else {

                return res.json(tipo);
            }
        });
    } catch (e) {
        res.json(null);
    }
}

exports.obtenerTipo = function (req, res) {
    try {
        var id = req.params.id;
        Tipo.find({ _id: id }, function (err, tipo) {
            if (err) return res.json(null);
            if (!tipo) {
                return res.json(null);
            } else {
                return res.json(tipo);

            }
        });
    } catch (e) {
        res.json(null);
    }
}

exports.modificarTipo = function (req, res) {
    try {
        var id = req.params.id;
        delete req.body.id
        Tipo.update({ _id: id }, req.body, function (err, tipo) {
            return res.json(tipo);
        })
    } catch (e) {
        res.json(null);
    }
}

exports.buscarTipo = function (req, res) {
    try {
        var dato = req.params.valor;
        Tipo.find(({
            $and: [
                { $or: [{ nombre: dato }, { precio: dato }, { camas: dato }, { capacidad: dato }] },
                { $and: [{ activo: "1" }] }
            ]
        }), function (err, tipo) {
            if (!tipo) {
                return res.json(null);
            }
            else {
                return res.json(tipo);
            }
        }).sort({ "nombre": 1 }).collation({ locale: "en", strength: 2 });
    } catch (e) {
        res.json(null);
    }
}


exports.eliminarTipo = function (req, res) {
    try {
        var id = req.params.id;
       console.log(id);
                Tipo.findOneAndUpdate({ _id: id }, { activo: "0" }, function (err, tipo) {
                    if (err) return res.json(null)
                    if (!tipo) {
                        return res.json(null);
                    } else {
                        console.log("Estado del tipo modificado");
                        res.json(1);
                    }
                });
            
    } catch (e) {
        res.json(null);
    }

}

exports.listarTiposTodos = function (req, res) {
    try {
        Tipo.find(function (err, tipo) {
            if (err) return res.json(null);
            if (!tipo) {
                return res.json(null);
            } else {

                return res.json(tipo);
            }
        });
    } catch (e) {
        res.json(null);
    }
}


exports.TiposyCabanias = function (req, res) {
    try {
        Tipo.aggregate([    
            {
                $match: {'activo':1}
            },
            {
                $lookup: {
                    from: 'cabanias',
                    localField: '_id',
                    foreignField: 'tipo',
                    as: 'cabanias'
                },
            }, 
        ]).sort({
            updatedAt: 1
        }).exec(function (err, cabania) {
            if (err) {
                console.log("error en la recuperacion de datos");
                res.send(null);
            } else if (!cabania) {
                console.log("cabanias vacio",cabania);
                res.json(null);
            }   else {

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
                        precio: cabania[i].tipos[0].precio
                    })
                }
                res.send(result);
            }
        });
    } catch (e) {
        res.json(null);
    }
}
