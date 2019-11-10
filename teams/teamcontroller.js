const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const appteam = express();
appteam.use(bodyParser.json());
appteam.use(bodyParser.urlencoded({ extended: false }));

const HOST = '10.0.4.135:5000';


appteam.get('/team/:id', (req, res) => {
    request.get(HOST + '/team/' + id, {json:true}, function(err, r) {
    if (err) {
        console.log(err);
        } else {
        return  r.body;
        }
    });
});

    