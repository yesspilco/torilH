const mongoose = require('mongoose');
const empleadoSchema = require('../models/empleados-models');

empleadoSchema.statics = {
    crear: function(data,cb){
        const empleado= new this(data);
        empleado.save(cb);
    },
    login: function(query,cb){
        this.find(query,cb);
    }
}

const empleadoModel= mongoose.model('Empleados', empleadoSchema);
module.exports= empleadoModel;