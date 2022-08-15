const express = require('express');
const cors = require('cors');



class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.horarios = '/api/horario'

        this.middelwars();
        this.routes();
    }

    middelwars(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.horarios, require('../routers/horarios.router'));
    }


    listen(){
        this.app.listen(this.port,()=>{
            console.log('corriendo en el puerto:', this.port);
        });
    }

}


module.exports = Server;