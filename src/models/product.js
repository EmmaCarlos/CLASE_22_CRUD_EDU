const path = require('path');
const fs = require('fs');
const colorModel = require('./color.js');
const brandModel = require('./brand.js');
const model = {
    all: function() {
        const directory = path.resolve(__dirname,"../data","products.json")
        const file = fs.readFileSync(directory,"utf-8")
        const convert = JSON.parse(file)
        return convert
    },
    allWithExtra: function () {
        let productos = this.all();
        productos.map(element => {
            element.brand = brandModel.one(element.brand)
            return element
        }).map(element => {
            element.colors = element.colors.map(color => {
                color = colorModel.one(color)
                return color
            })
            return element
        })
        return productos;
    },
    one: function (id) {
        let productos = this.allWithExtra();
        let resultado = productos.find(producto => producto.id == id)
        return resultado;
    },
    new: function (data,file) {
        const directory = path.resolve(__dirname,"../data","products.json")//metodo sort para ordenar un id
        let productos = this.all();
        let nuevo = {
            id: productos.length > 0 ? productos[productos.length -1].id + 1: 1,/*idea capturar el id del ultimo elemento*/
            name: data.name,//con el req.body
            brand: parseInt(data.brand),
            colors: data.colors.map(color => parseInt(color)),
            image: file.filename//nombre del archivo que yo le mande
        }    
        productos.push(nuevo)
        fs.writeFileSync(directory,JSON.stringify(productos,null,2));//null,2 - cada vez que encuentra una llave o , empieza a hacer tab, 2 es la cant de espacio que salta
        return true;    
    },
    edit: function (data,file,id) {     //modificar
        const directory = path.resolve(__dirname,"../data","products.json")
        let productos = this.all();
        let updated = this.one(id);
        // eliminamos la imagen de la carpeta upload
        fs.unlinkSync(path.resolve(__dirname,"../../public/uploads/products",updated.image))
        
        productos.map(producto => {// map elemento por elemento
            if(producto.id == id ){
                producto.name = data.name,
                producto.brand = parseInt(data.brand),
                producto.colors = data.colors.map(color => parseInt(color)),
                producto.image = file.filename
                return producto//return del elemento
            }
            return producto
        })
        fs.writeFileSync(directory,JSON.stringify(productos,null,2));
        return true;
    },
    delete: function (id) {
        const directory = path.resolve(__dirname,"../data","products.json")
        let productos = this.all();
        let deleted = this.one(id);
        // eliminamos la imagen de la carpeta upload
        let exist= fs.unlinkSync(path.resolve(__dirname,"../../public/uploads/products",deleted.image))
       
        if (exist && deleted.image.indexOf("default") != -1){
            fs.unlinkSync(path.resolve(__dirname,"../../public/uploads/products",deleted.image))//si esxite entonces lo elimino (unlinkSync true o false)
        }

        // filtarmos el producto que deaseamos eliminar
        productos = productos.filter(producto => producto.id != deleted.id )
        fs.writeFileSync(directory,JSON.stringify(productos,null,2));
        return true;
    }

};
module.exports = model;