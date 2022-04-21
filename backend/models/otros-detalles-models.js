const mongoose= require('mongoose');
const Schema= mongoose.Schema;
var SchemaTypes=mongoose.Schema.Types;

const Autoincrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/El-Toril");

Autoincrement.initialize(connection);


mongoose.set('useCreateIndex',true);
mongoose.set('useUnifiedTopology',true)

const otrosDetallesSchema= new Schema({
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
    descripcion:{
        type: String,
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

otrosDetallesSchema.plugin(Autoincrement.plugin,{
    model: 'otrosDetalles',
    field: 'otrosdetalleId',
    startAt: 1,
    incementBy: 1
});
module.exports=otrosDetallesSchema;