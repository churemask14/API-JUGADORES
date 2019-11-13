'use strict'

const express = require ('express');    
var app = express();
var cors = require ('cors');
const port = process.env.PORT || 3001;
const bodyParser = require ('body-parser');
let playercontroller = require("./controllers/playercontroller");
var errorHandler = require ('./helper/error_handler');

app.use(bodyParser.urlencoded ({extended: false}));
app.use(bodyParser.json());
//con esto digo que el formato a usar es json

app.use(cors())
// cors me permite recibir un request desde otros dominios diferentes al mio
app.use ("/players", playercontroller);
app.use (errorHandler);
/*
var port;

if (process.env.NODE_ENV === 'production'){
    port  = process.env.PORT;
}   else {
    port = 3001;
}    
*/

app.listen (port, () =>{
    console.log(`api rest corriendo en http://localhost:${port}`)
}); 