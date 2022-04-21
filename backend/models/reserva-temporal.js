const mongoose= require('mongoose');
const Schema= mongoose.Schema;

var SchemaTypes=mongoose.Schema.Types;


const reservaTempSchema= new Schema({
    
    idservicio:{
        type: String,
    },
    nombre:{
        type: String,
    },
    tipo:{
        type: String,
    },
    precio:{
        type: Number,
    },
    huespedes:{
        type:Number,
    },
    subtotal:{
        type: Number,
    },
    idcabania:{
        type: String,
    },
    idtipo:{
        type: String,
    },
    dias:{
        type:Number,
    },
    activo:{
        type:Number,        
        default: 1,
    }
},{
    timestamps: true
  }
);
module.exports=reservaTempSchema;