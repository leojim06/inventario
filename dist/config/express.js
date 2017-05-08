"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// import * as logger from 'morgan';
var bodyParser = require("body-parser");
var path = require("path");
var routes_1 = require("../app/routes");
/**
 * Clase de configuración de la Aplicacion.
 * Se crea la aplciación express, se establecen los middleware y las rutas
 *
 * @class App
 */
var App = (function () {
    function App() {
        this.express = express();
        this.setMiddleware();
        this.setRoutes();
        // this.setSPA();
    }
    App.prototype.setSPA = function () {
        // this.express.use(__dirname + '/public');
        this.express.use(express.static('../' + __dirname + '/public'));
        this.express.get('/', function (req, res) {
            res.sendFile(path.join(__dirname + '/public/index.html'));
        });
    };
    App.prototype.setMiddleware = function () {
        // Establecer el logger solo si el entorno es de desarrollo
        // if (this.express.get('env') === 'development') {
        //    this.express.use(logger('dev'));
        // }
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
            next();
        });
    };
    App.prototype.setRoutes = function () {
        // this.express.get('/', this.renderHelloWorld);
        this.express.use(new routes_1.Routes().routes);
    };
    App.prototype.renderHelloWorld = function (req, res) {
        res.status(200).send({ message: 'Hello World (^.^)' });
    };
    return App;
}());
exports.default = new App().express;
