const mongoose= require('mongoose');
const Schema= mongoose.Schema;
var SchemaTypes=mongoose.Schema.Types;

const Autoincrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/El-Toril");

Autoincrement.initialize(connection);


mongoose.set('useCreateIndex',true);
mongoose.set('useUnifiedTopology',true)

const salonesSchema= new Schema({
    servicio:{
        type: SchemaTypes.ObjectId, 
        required: true,
        sparse: true
    },
    capacidad:{
        type: Number,
        required: true,
    },
    precio:{
        type: Number,
        required: true,
    }
},{
    timestamps: true
  }
);

salonesSchema.plugin(Autoincrement.plugin,{
    model: 'salones',
    field: 'salonesId',
    startAt: 1,
    incementBy: 1
});

module.exports=salonesSchema;