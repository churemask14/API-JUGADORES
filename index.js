'use strict'

const express = require ('express');    
var app = express();
var cors = require ('cors');
const port = process.env.PORT || 3001;
const bodyParser = require ('body-parser');
let playercontroller = require("./controllers/playercontroller");
var error = require ('./helper/error_handler');

app.use(bodyParser.urlencoded ({extended: false}));
app.use(bodyParser.json());
//con esto digo que el formato a usar es json

app.use(cors())
// cors me permite recibir un request desde otros dominios diferentes al mio
app.use (error);
app.use ("/players", playercontroller);
app.listen (port, () =>{
    console.log(`api rest corriendo en http://localhost:${port}`)
}); 