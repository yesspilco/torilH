var Cliente = require('../dao/auth.dao');
var Reserva = require('../dao/reservacion-dao');
const bcrypt = require('bcryptjs');
const { isValidObjectId } = require('mongoose');
const SECRET_KEY = 'secretkey123456';




exports.listarClientes = function (req, res) {
    try {
        Cliente.find({activo:"1"},function(err, cliente)  {
            if (err) return res.json(null);
            if (!cliente) {
                return res.json(null);
            } else {
                return res.json(cliente);
            }
        }).sort({ "apellido" : 1});
    } catch (e) {
        res.json(null);
    }
}


exports.obtenerCliente = function (req, res) {
    try {
        var id = req.params.id;
        Cliente.find({_id:id}, function(err, cliente) {
            if (err) return res.json(null);
            if (!cliente) {
                return res.json(null);
            } else {
                console.log("datos del cliente",cliente);      
                return res.json(cliente);     
                    
            }
        });
    } catch (e) {
        res.json(null);
    }
}


//buscar cliente por cedula
exports.obtenerClienteCedula = function (req, res) {
    try {
        var cedula = req.params.cedula;
        Cliente.find({cedula:cedula}, function(err, cliente) {
            if (err) return res.json(null);
            if (!cliente) {
                return res.json(null);
            } else {
                console.log("datos del cliente",cliente);      
                return res.json(cliente);     
                    
            }
        });
    } catch (e) {
        res.json(null);
    }
}

exports.modificarCliente = function (req, res) {
    try {
        var id = req.params.id;
        delete req.body.id
        Cliente.update({_id:id},req.body,function(err,cliente){
            return res.json(cliente);
        })
    } catch (e) {
        res.json(null);
    }    
} 



//buscar clientes dato un parametro de busqueda
exports.buscarCliente = function (req, res) {
    try {
        var dato = req.params.valor;
        Cliente.find(({
                        $and: [
                            {$or:[{nombre:dato},{apellido: dato},{correo:dato},{direccion: dato}]},
                            {$and:[{activo: "1"}]}   
                        ]
                    }),function(err, cliente){   
            if (!cliente) {
                return res.json(null);
            } 
            else
            {
                return res.json(cliente); 
            }
        }).sort({ "apellido" : 1}).collation({locale: "en", strength: 2});
    } catch (e) {
        res.json(null);
    }    
} 

exports.eliminarCliente =function(req, res){
    try{
        var id = req.params.id;
        Cliente.findOneAndUpdate({ _id: id }, { activo: "0" }, function (err, tipo) {
            if (err) return res.json(null)
            if (!tipo) {
                return res.json(null);
            } else {
                console.log("Estado del cliente modificado");
                res.json(1);
            }
        });
    }catch(e){
        res.json(null);
    }
}

//si el cliente tiene una reservacion no se elimina, se inactiva
//si el cliente no registra ninguna reservacion se lo borra
exports.verificarClienteEliminar = function (req, res) {
    try {
        var id = req.params.id;
       console.log(id);
       Reserva.findOne({ cliente: id }, function (err, reserva) {
                    if (err) return res.json(null)
                    if (!reserva) {
                        Cliente.remove({ _id: id }, function (err, reserva) {
                            if (err) return res.json(null)
                            if (!reserva) {
                                return res.json(null);
                            } else {
                                console.log("Cliente eliminado");
                                res.json(1);
                            }
                        });
                    } else {
                        
                        Cliente.findOneAndUpdate({ _id: id }, { activo: "0" }, function (err, tipo) {
                            if (err) return res.json(null)
                            if (!tipo) {
                                return res.json(null);
                            } else {
                                console.log("Estado del cliente modificado");
                                res.json(1);
                            }
                        });

                    }
                });
            
    } catch (e) {
        res.json(null);
    }
}


exports.clientesInactivos = function (req, res) {
    try {
        Cliente.find({activo:"0"},function(err, cliente)  {
            if (err) return res.json(null);
            if (!cliente) {
                return res.json(null);
            } else {
                return res.json(cliente);
            }
        }).sort({ "apellido" : 1});
    } catch (e) {
        res.json(null);
    }
}

exports.activarCliente =function(req, res){
    try{
        var id = req.params.id;
        Cliente.findOneAndUpdate({ _id: id }, { activo: "1" }, function (err, tipo) {
            if (err) return res.json(null)
            if (!tipo) {
                return res.json(null);
            } else {
                console.log("Estado del cliente modificado");
                res.json(1);
            }
        });
    }catch(e){
        res.json(null);
    }
}


exports.primeros20Clientes = function (req, res) {
    try {
        Cliente.find({activo:"1"},function(err, cliente)  {
            if (err) return res.json(null);
            if (!cliente) {
                return res.json(null);
            } else {
                return res.json(cliente);
            }
        }).sort({$natural:1}).limit(20);
    } catch (e) {
        res.json(null);
    }
}

exports.reporteClientes = function (req, res) {
    try {
        Cliente.aggregate([

            {
                $match: {
                    activo: 1,
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

        ]).sort({_id: -1}).exec(function (err, reserva) {
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
                        _id: reserva[i]._id,
                        nombre: reserva[i].nombre,
                        apellido: reserva[i].apellido,
                        telefono: reserva[i].telefono,
                        direccion: reserva[i].direccion,
                        email: reserva[i].email,
                        cedula: reserva[i].cedula,
                        provincia: reserva[i].provincia
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

exports.reporteClientesPendientes = function (req, res) {
    try {
        Cliente.aggregate([
            {
                $lookup: {
                    from: 'reservacions',
                    localField: 'cliente',
                    foreignField: '_id',
                    as: 'reserva'
                },
            },
            {
                $match:{
                    'reserva.estado': 'Pendiente'
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

                /*const result = [];
                for (var i = 0; i < reserva.length; i++) {
                    result.push({
                        _id: reserva[i]._id,
                        nombre: reserva[i].nombre,
                        apellido: reserva[i].apellido,
                        telefono: reserva[i].telefono,
                        direccion: reserva[i].direccion,
                        email: reserva[i].email,
                        cedula: reserva[i].cedula
                    })
                }
                res.send(result);*/
                res.json(reserva);

            }
        });
    } catch (e) {
        console.log("sale por catch");
        res.json(null);
    }
}

exports.numeroClientes = function (req, res) {
    try {
        Cliente.find({activo:"1"},function(err, cliente)  {
            if (err) return res.json(null);
            if (!cliente) {
                return res.json(null);
            } else {
                return res.json(cliente);
            }
        }).count().sort({ "apellido" : 1});
    } catch (e) {
        res.json(null);
    }
}
