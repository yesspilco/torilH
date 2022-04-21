const Clientes= require('../dao/auth.dao');
const Empleados= require('../dao/empleados-dao');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';



exports.crearCliente =(req,res,next) => {
    
    const newCliente = {
        cedula:req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email,
        clave:  bcrypt.hashSync(req.body.clave),
        provincia:req.body.provincia
    }

console.log("nuevo cliente",newCliente);

    Clientes.create(newCliente,(err,user)=>{
        console.log(user);
    if(err && err.code== 11000)return res.status(409).send('El correo ya existe');
    if(err)return res.status(500).send('Error en el servidor');
    console.log("usuario",user);
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
                codigoId: user.id,
                token: accessToken,
                expiresIn: expiresIn
            }
            //response hacia el frontend
            res.send({dataUser});
    });
}



exports.loginCliente = (req, res, next) => {
    try {
        const userData = {
            email: req.body.email,
            clave: req.body.clave
        }
        console.log(userData);
        Clientes.findOne({ email: userData.email }, (err, user) => {
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