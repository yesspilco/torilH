const mongoose= require('mongoose');
const Schema= mongoose.Schema;
var SchemaTypes=mongoose.Schema.Types;

const Autoincrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/El-Toril");

Autoincrement.initialize(connection);


mongoose.set('useCreateIndex',true);
mongoose.set('useUnifiedTopology',true)
const pagoSchema= new Schema({
    
    reserva:{
        type: SchemaTypes.ObjectId,
        required: true,
        trim: true
    },
    total:{
        type: Number,
        required: true,
    },
    abono:{
        type: Number,
        required: true,
        trim: true,
    },
    saldo:{
        type: Number,
        required: true,
    },
},{
    timestamps: true
  }
);
module.exports=pagoSchema;