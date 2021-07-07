const product = require('../models/product');
const color = require('../models/color');
const brand = require('../models/brand');
module.exports = {
    index:(req,res) => res.render("product/list",{list:product.allWithExtra()}),
    show: (req,res) => res.render("product/detail",{product:product.one(req.params.id)}),
    create: (req,res) => res.render("product/create",{colors:color.all(),brands:brand.all()}),
    save: (req,res) => {
        let result = product.new(req.body,req.file)
        return result == true ? res.redirect("/") : res.send("Error al cargar la informacion") 
    },
    edit: (req,res) => res.render("product/edit",{product:product.one(req.params.id),colors: color.all(),brands:brand.all()}),
    update: (req,res) =>{
        let result = product.edit(req.body,req.file,req.params.id)
        return result == true ? res.redirect("/") : res.send("Error al cargar la informacion") 
    },
    delete: (req,res) => {
        let result = product.delete(req.params.id);
        return result == true ? res.redirect("/") : res.send("Error al cargar la informacion") 
    }
}