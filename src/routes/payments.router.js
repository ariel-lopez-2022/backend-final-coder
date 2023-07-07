const {Router} = require('express');
const payments = require('../controller/pyment.controller');

const router =  Router();

router.post('/', payments)

module.exports = router;