const express = require('express');
const path = require('path');
const method = require('method-override');
const app = express();

/* Servidor */
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"),()=>console.log("Server start http://localhost:"+app.get("port")))

/* Acceso Publico */
app.use(express.static(path.resolve(__dirname,"../public")));

/* View Engine */
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"./views"));

/* Data Configuration */

app.use(express.urlencoded({extended:false})) // Not fund req.body
app.use(method("_method")) // ?_method=PUT o ?_method=DELETE en el form method="POST" va a viajar por el body y lo vamos a capturas en rutas por metodo


/* Rutas */
const main = require('./routes/main');
app.use(main);

const product = require('./routes/product');
app.use("/product",product)

//CRUD
//Create -> GET / create mostar el fomulario de creacion de productos
//          POST -> /save o /storage (pocas veces) guardar los datos del formulario anterior 
//          Read ->GET -> / muestra o leer todos los elementos //all whit extra
//               ->GET / id muestra un solo elemento de los productos
// Uddate ->GET /edit/:id  mostar el fomulario de edicion de un producto con ifno precargada
//          PUT -> metodo /upgrade/:id ((son buenas practicas"/:id")puede venir o no desde el body o params)save guardar los datos del formulario anterior modificando el producto 
//DELETE -> /delete  o /destroy  elimina el producto con el id enviado del formulario 