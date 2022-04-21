'use strict'
const cors= require('cors');

const express= require('express');
const path= require('path');

const DB= require('./DataBase/db');
const https = require('https');
const fs = require('fs');
const multipart = require('connect-multiparty');
//inicializar la base de datos
DB();



const app= express();
const router= express.Router();

const bodyParser= require('body-parser');
const bodyParserJSON= bodyParser.json();
const bodyParserURLEncoded= bodyParser.urlencoded({extended: true});



const multipartMiddleware = multipart({ uploadDir: 'C:/Users/yessy/OneDrive/Documentos/Pilco Yesenia/tesis/Toril/frontend/src/assets/tipos' });
const multipartMiddleware2 = multipart({ uploadDir: 'C:/Users/yessy/OneDrive/Documentos/Pilco Yesenia/tesis/Toril/frontend/src/assets/servicios' });
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);




app.use(cors());
var routes_app=require('./routes/routes');
//var routes_app= require('./routes/routes');
//app.use('/api',router);
app.use('/api',routes_app);
//authRoutes(router);
router.get('/',(req,res)=>{
    res.send('Hola bienvenidos');
});

//para almacenar fotos
app.use('/uploads', express.static(path.resolve('uploads')));


app.use(routes_app);
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'),()=>{
    console.log('Servidor en el puerto',app.get('port'));
   });

   app.post('/api1/upload1', multipartMiddleware, (req, res) => {
    var divi = req.files.uploads[0].path;
    console.log("variable var",divi);
    const d = divi.split('\\');
    console.log("variable d",d);
    //const d = divi.split('/');
    res.json(d[10] + '/' + d[11] + '/' + d[12]);
  });

  app.post('/api1/upload2', multipartMiddleware2, (req, res) => {
    var divi = req.files.uploads[0].path;
    console.log("variable var",divi);
    const d = divi.split('\\');
    console.log("variable d",d);
    //const d = divi.split('/');
    res.json(d[10] + '/' + d[11] + '/' + d[12]);
  });