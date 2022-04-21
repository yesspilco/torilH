const mongoose = require('mongoose');
const tipoSchema = require('../models/tipos-models');

tipoSchema.statics = {
    crear: function(data,cb){
        const tipo= new this(data);
        tipo.save(cb);
    }
}

const tipoModel= mongoose.model('tipo', tipoSchema);
module.exports= tipoModel;