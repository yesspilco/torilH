const mongoose= require('mongoose');
const Schema= mongoose.Schema;

mongoose.set('useCreateIndex',true);
const clienteSchema= new Schema({
    cedula:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    apellido:{
        type: String,
        required: true,
    },
    direccion:{
        type: String,
        required: true,
    },
    telefono:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    clave:{
        type: String,
        required: true,
        trim: true
    },
    activo:{
        type: Number,
        default:1,
        trim: true
    },
    rol:{
        default: 3,
        type: Number,
        trim:true
    },provincia:{
        type:String,
        trim:true
    }
},{
    timestamps: true
  }
);
module.exports=clienteSchema;