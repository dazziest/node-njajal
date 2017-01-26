var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET home page. */
router.get('/api/puppies', db.getPuppies);
router.get('/api/puppies/:id', db.getPuppies);
router.post('/api/puppies', db.getPuppies);
router.put('/api/puppies/:id', db.getPuppies);
router.delete('/api/puppies/:id', db.getPuppies);

module.exports = router;
