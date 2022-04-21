const mongoose = require('mongoose');
const clienteSchema = require('../models/auth-models');

clienteSchema.statics = {
    crear: function(data,cb){
        const user= new this(data);
        console.log(user);
        user.save(cb);
    },
    login: function(query,cb){
        this.find(query,cb);
    }
}

const ClienteModel= mongoose.model('Clientes', clienteSchema);
module.exports= ClienteModel;