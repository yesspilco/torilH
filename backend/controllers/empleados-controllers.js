const Empleado= require('../dao/empleados-dao');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';




exports.crearEmpleado =(req,res,next) => {
    
    const newEmpleado = {
        cedula:req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email,
        clave:  bcrypt.hashSync(req.body.clave),
        activo: 1,
        rol:req.body.rol
    }

    console.log("nuevo empleado",newEmpleado);
    Empleado.crear(newEmpleado,(err,user)=>{
    if(err && err.code== 11000)return res.status(409).send('El correo ya existe');
    if(err)return res.status(500).send('Error en el servidor');console.log("Error",err);
    const expiresIn= 24*60*60;
        const accessToken= jwt.sign({id: user.id},
            SECRET_KEY,{
                expiresIn: expiresIn
            });
            const dataUser={
                nombre:user.nombre,
                apellido:user.apellido,
                email:user.email,
                rol:user.rol,
                accessToken: accessToken,
                expiresIn: expiresIn
            }
            //response hacia el frontend
            res.send({dataUser});
            console.log("datos almacenados",dataUser);
    });
}

exports.registroAdmin = (req, res, next) => {
    try {
        const newUser = {
            cedula:'0602545254',
            nombre: 'Jorge',
            apellido: 'Erazo',
            direccion: 'Riobamba',
            telefono: '0985214586',
            email: 'eltoril@gmail.com',
            clave:  bcrypt.hashSync('eltoril2021.'),
            activo: 1,
            rol:1
        }
        Empleado.crear(newUser, (err, user) => {
            if (err) return res.json(null);
            if (!user) {
                return res.json(null);
            }
            else {
                return res.json(1);
            }
        });
    } catch (e) {
        res.json(null);
    }
}

exports.loginEmpleados = (req, res, next) => {
        try {
            const userData = {
                email: req.body.email,
                clave: req.body.clave
            }
            console.log(userData);
            Empleado.findOne({ email: userData.email }, (err, user) => {
                if (err) return res.status(500).send('Server error!');
                if (!user) {
                    console.log("correo no existe");
                    // email does not exist
                    const code = {
                        cemail: 1,
                        userName: 0,
                        status: 409,
                        msj: "something is wrong..."
                    }
                    res.send({ code });
                } else {
                    const resultPassword = bcrypt.compareSync(userData.clave, user.clave);
                    if (resultPassword) {
                        const expiresIn = 8 * 60 * 60 * 1000;
                        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
                        const dataUser = {
                            accessToken: accessToken,
                            expiresIn: expiresIn,
                            codigoId: user.id,
                            email: user.email,
                            nombre:user.nombre,
                            apellido:user.apellido,
                            rol:user.rol
                        }
                        const newSession = {
                            codigoUsuario: user.id
                        }
                        res.send({ dataUser });
                        console.log(dataUser);
    
                    } else {
                        // password wrong
                        console.log("contraseña incorrecta");
                        const code = {
                            correo: 0,
                            userName: 1,
                            status: 409,
                            msj: "something is wrong..."
                        }
                        res.send({ code });
                    }
                }
            });
        } catch (e) {
            return res.json(null);
    }
    
        
        
    }


exports.listarEmpleados = function (req, res) {
    try {
        Empleado.find({activo:"1"},function(err, empleado) {
            if (err) return res.json(null);
            if (!empleado) {
                return res.json(null);
            } else {

                return res.json(empleado);
            }
        }).sort({ "apellido" : 1});
    } catch (e) {
        res.json(null);
    }
}

exports.empleadosInactivos = function (req, res) {
    try {
        Empleado.find({activo:"0"},function(err, empleado) {
            if (err) return res.json(null);
            if (!empleado) {
                return res.json(null);
            } else {

                return res.json(empleado);
            }
        }).sort({ "apellido" : 1});
    } catch (e) {
        res.json(null);
    }
}

exports.obtenerEmpleado = function (req, res) {
    try {
        var id = req.params.id;
        Empleado.find({_id:id}, function(err, empleado) {
            if (err) return res.json(null);
            if (!empleado) {
                return res.json(null);
            } else {
                return res.json(empleado);
                
            }
        });
    } catch (e) {
        res.json(null);
    }
}

exports.modificarEmpleado = function (req, res) {
    try {
        var id = req.params.id;
        delete req.body.id
        console.log("datos",req.body);
        Empleado.update({_id:id},req.body,function(err,empleado){
            
            return res.json(empleado);
            
        })
    } catch (e) {
        res.json(null);
    }
    
}

exports.eliminarEmpleado =function(req, res){
    try{
        var id = req.params.id;
        Empleado.findOneAndUpdate({ _id: id }, { activo: "0" }, function (err, tipo) {
            if (err) return res.json(null)
            if (!tipo) {
                return res.json(null);
            } else {
                console.log("Estado del empleado modificado");
                res.json(1);
            }
        });
    }catch(e){
        res.json(null);
    }
}

exports.activarEmpleado =function(req, res){
    try{
        var id = req.params.id;
        Empleado.findOneAndUpdate({ _id: id }, { activo: "1" }, function (err, tipo) {
            if (err) return res.json(null)
            if (!tipo) {
                return res.json(null);
            } else {
                console.log("Estado del empleado modificado");
                res.json(1);
            }
        });
    }catch(e){
        res.json(null);
    }
}

//buscar clientes dato un parametro de busqueda
exports.buscarEmpleado = function (req, res) {
    try {
        var dato = req.params.valor;
        Empleado.find(({
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

exports.numeroEmpleados = function (req, res) {
    try {
        Empleado.find({activo:"1"},function(err, cliente)  {
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