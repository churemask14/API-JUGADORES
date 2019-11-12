'use strict'

var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://matias:matute0294@ds147684.mlab.com:47684/heroku_tr4k0q2d', (err, res) => {
    if (err){
        console.log (err)}
    else{
        console.log('Conexión a la base de datos establecida');}

        { useNewUrlParser: true }
        { useUnifiedTopology: true }
        mongoose.set('useFindAndModify', false);
});
    
//mongodb://heroku_tr4k0q2d:1ebaiu3ak313512945t17t8al0@ds147684.mlab.com:47684/heroku_tr4k0q2d