module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    console.log("Ingreso a manejo de errores");
    console.log(err);

    
    if (typeof (err) === 'string') {
        // Errores de la aplicacion
        return res.status(400).json({ message: err }); 
    }

    if (err.name === 'ValidationError') {
        // Error de Validacion de mongoose
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'CastError') {
        return res.status(404).json({ message: "jugador no encontrado" });
        //return res.status(400).json({ message: err.message });
    }

    if (err.name === "Bad Request"){
       return res.status(err.status_code).json({ message: err.message });
    }

    if (err.name === "Not Found"){
        return res.status(404).json({ message: err.message });
    }


    // Error por defecto del servidor
    return res.status(500).json({ message: err.message });
}



/*
try{
    let p = await playerservice.updateplayer(req.params.id, req.body);
    res.status(200).json(p)
}catch(err){
    console.error(err);
    if (err.name ==="CastError"){
        res.status(400).json(err);
    }
    res.status(500).json(err);
}
}); */