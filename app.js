"use strict";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongodb = require("mongodb");
const mongoose = require('mongoose');
const ObjectID = mongodb.ObjectID;

let port = process.env.PORT || 8080;
let ip = process.env.IP || '127.0.0.1';
let addr =  `${ip}:${port}`;

mongoose.connect('mongodb://localhost/pl0')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  response.render('index', {title : 'Proyecto Procesadores de Lenguajes'});
});

app.get('/pl0', (request, response) => {
    var tree;
    try {
        tree = PEG.parse(request.query.input);
        semantic(tree);
        if (tree.errors)
            tree = tree.errors;
    } catch (e) {
        console.log("ERROR: " + e);
        tree = "Syntax Error: " + e.message.substring(0, e.message.length - 1) + " in line " + e.location.start.line;
    }
    response.send({
        "tree": tree
    });
});

/*Formato ficheros entrada*/
app.param('entrada', function(req, res, next, entrada) {
    if (entrada.match(/^[a-z_]\w*\.pl0$/i)) {
        req.entrada = entrada;
    } else {
        next(new Error(`<${entrada}> `));
    }
    next();
});

const Input = require('./models/test-mongo.js');

/*Creamos una entrada nueva en la BD con el nombre recibido en el request
  Si ya hay 4 entradas, se borra la última*/
app.get('/mongo/:entrada', function(req, res) {
    Input.find({}, function(err, docs) {
        if (err)
            return err;
        if (docs.length >= 6) {
            Input.find({
                name: docs[3].name
            }).remove().exec();
        }
    });
    let input = new Input({
        "name": req.entrada,
        "content": req.query.content
    });

    input.save(function(err) {
        if (err) {
            console.log(`Hubieron errores:\n${err}`);
            return err;
        }
        console.log(`Guardado: ${input}`);
    });
});

/*Se devuelve un array con todas las entradas de la BD como respuesta*/
app.get('/find', function(req, res) {
    Input.find({}, function(err, docs) {
        if (err)
            return err;
        res.send(docs);
    });
});

/*Se devuelve como respuesta la entrada correspondiente al nombre
  especificado en la request*/
app.get('/findByName', function(req, res) {
    Input.find({
        name: req.query.name
    }, function(err, docs) {
        res.send(docs);
    });
});

//	Definimos la ruta para el parser
app.get('/parser', (req,resp) =>{
	resp.send({"tree" : parser(req.query.input)});
});

app.listen(port,ip, () =>{
   console.log(`App listening at ${addr}`);
});
