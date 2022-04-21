const mongoose = require('mongoose');
const serviciosSchema = require('../models/servicios-models');
const Autoincrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/El-Toril");
Autoincrement.initialize(connection);


mongoose.set('useCreateIndex',true);
mongoose.set('useUnifiedTopology',true);

serviciosSchema.statics = {
    crear: function(data,cb){
        const servicio= new this(data);
        servicio.save(cb);
    }
}


const servicioModel= mongoose.model('servicios',serviciosSchema);
module.exports= servicioModel;