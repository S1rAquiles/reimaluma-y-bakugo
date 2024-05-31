const ContactosController = require ("../controllers/ContactosControllers");
const ContacController = new ContactosController();
const indexController = require ("../controllers/indexController");

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', indexController);

router.post("/form-datos", ContacController.add);

module.exports = router;
