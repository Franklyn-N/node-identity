const express = require('express');

const dataController = require('../controllers/data');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.post('/data', dataController.createData);

module.exports = router;