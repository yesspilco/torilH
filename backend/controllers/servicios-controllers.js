const Servicio= require('../dao/servicios-dao');
const Cabania= require('../dao/cabanias-dao');
const Tipo= require('../dao/tipos-dao');

exports.registrarServicio =(req,res,next) => {
    
    const newServicio = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.body.imgproducto,
    }


    Servicio.crear(newServicio,(err,user)=>{
     if(err) {
         res.send(null);
     }else if(!user){
         res.json(null);
     }else{
         res.json(user._id);
     }
    });    
}

exports.modificarServicio = function (req, res) {
    try {
        var id = req.params.id;
        delete req.body.id
        Servicio.update({_id:id},req.body,function(err,servicio){
            return res.json(servicio);
    });
    } catch (e) {
        res.json(null);
    }    
}

exports.buscarServicio = function (req, res) {
    try {
        var dato = req.params.valor;
        Servicio.find(({
                        $and: [
                            {$or:[{nombre:dato}]},
                            {$and:[{activo: "1"}]}   
                        ]
                    }),function(err, servicio){   
            if (!servicio) {
                return res.json(null);
            } 
            else
            {
                return res.json(servicio); 
            }
        }).sort({ "nombre" : 1}).collation({locale: "en", strength: 2});
    } catch (e) {
        res.json(null);
    }    
} 

exports.eliminarServicio =function(req, res){
    try{
        var id = req.params.id;
        console.log("servicio a eliminar",id);
        Servicio.findOneAndUpdate({ _id: id }, { activo: "0" }, function (err, tipo) {
            if (err) return res.json(null)
            if (!tipo) {
                return res.json(null);
            } else {
                console.log("Estado del servicio modificado");
                res.json(1);
            }
        });
    }catch(e){
        res.json(null);
    }
}


exports.activarServicio =function(req, res){
    try{
        var id = req.params.id;
        console.log(id);
        Servicio.findOneAndUpdate({ _id: id }, { activo: "1" }, function (err, tipo) {
            if (err) return res.json(null)
            if (!tipo) {
                return res.json(null);
            } else {
                console.log("Estado del servicio modificado");
                res.json(1);
            }
        });
    }catch(e){
        res.json(null);
    }
}

exports.modificarServicioDisponible = function (req, res) {
    try {
        var id = req.params.id;
        console.log("id del servicio",id);
        Servicio.findOneAndUpdate({ _id: id }, { estado: "disponible" }, function (err, factura) {
            return res.json(factura);
        })
    } catch (e) {
        res.json(null);
    }    
} 
exports.modificarServicioOcupada = function (req, res) {
    try {
        var id = req.params.id;
        console.log("id del servicio",id);
        Servicio.findOneAndUpdate({ _id: id }, { estado: "ocupada" }, function (err, factura) {
            return res.json(factura);
        })
    } catch (e) {
        res.json(null);
    }    
} 