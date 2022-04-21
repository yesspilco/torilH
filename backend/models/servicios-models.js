const mongoose= require('mongoose');
const Schema= mongoose.Schema;

mongoose.set('useCreateIndex',true);
const serviciosSchema= new Schema({
    nombre:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    activo:{
        type: Number,
        default: 1,
        required: true,
    },
    descripcion:{
        type: String,
        required: true,
    },    
    estado:{
        type: String,
        required:true,
        default: "disponible"
    },
    imagen:{
        type: String
    }
},{
    timestamps: true
  }
);
module.exports=serviciosSchema;