const mongoose= require('mongoose');
const Schema= mongoose.Schema;

mongoose.set('useCreateIndex',true);
const tipoSchema= new Schema({
    nombre:{ 
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    descripcion:{
        type: String,
        required: true,
        trim: true
    },
    precio:{
        type: Number,
        required: true,
    },
    camas:{
        type: Number,
        required: true,
        trim: true
    },
    capacidad:{
        type: Number,
        required: true,
        trim:true        
    },
    activo:{
        type: Number,
        default:1,
        required: true,
        trim: true
    },
    imagen:{
        type: String
    }
},{
    timestamps: true
  }
);


module.exports=tipoSchema;