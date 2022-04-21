const mongoose= require('mongoose');
const Schema= mongoose.Schema;
var SchemaTypes=mongoose.Schema.Types;

const Autoincrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/El-Toril");

Autoincrement.initialize(connection);


mongoose.set('useCreateIndex',true);
mongoose.set('useUnifiedTopology',true)

const reservacionDetalleSchema= new Schema({
    valorPersona:{
        type: Number,
        required:true
    },
    cantidad:{
        type:Number,
        required:true,
    },
    subtotal:{
        type: Number,
        required: true
    },
    servicio:{
        type: SchemaTypes.ObjectId,
        required: true
    },
    reserva:{
        type: SchemaTypes.ObjectId,
        required: true
    },
},{
    timestamps: true
  }
);

reservacionDetalleSchema.plugin(Autoincrement.plugin,{
    model: 'reservacionDetalles',
    field: 'detalleId',
    startAt: 1,
    incementBy: 1
});
module.exports=reservacionDetalleSchema;