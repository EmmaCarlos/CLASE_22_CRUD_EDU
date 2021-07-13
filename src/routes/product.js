const express = require('express');
const router = express.Router();
const product = require('../controllers/product');
const multer = require('multer');
const path = require('path');
let dest = multer.diskStorage({
    destination: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        if(extension.indexOf("jpg") > 0){
            cb(null, path.resolve(__dirname,"../../public/uploads","products"))
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
})
const upload = multer({storage:dest});

router.get("/",product.index)

router.get("/create",product.create)

router.get("/:id",product.show)

router.get("/edit/:id",product.edit)//que producto va hacer el editado

router.post("/save/:id",[upload.single("image")],product.save)//puede ser opcional /:id

router.put("/update/:id",[upload.single("image")],product.update)

router.delete("/delete/:id",product.delete)//

//consejo agrupo todas las de tipo GET CON GET PUT CON PUT etc.
module.exports = router

//definir bien el orden de procedencia de rutas por que express lee desde arriba para abajo 