const mongoose= require('mongoose');
const Schema= mongoose.Schema;

mongoose.set('useCreateIndex',true);
const hosteriaSchema= new Schema({
    ruc:{
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
    representanten:{
        type: String,
        required: true,
    },
    representantea:{
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
        trim:true
    },
    
    iva:{
        type: Number,
    }
},{
    timestamps: true
  }
);
module.exports=hosteriaSchema;