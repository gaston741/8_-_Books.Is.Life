const express = require('express');
const router = express.Router();

const {detail,cart,edit,add,create}=require('../controllers/productController')
/* GET home page. */
router.get('/detail', detail);
router.get('/cart', cart);
router.get('/edit', edit);
router.get('/add', add);
router.get('/create', create);



module.exports = router;
