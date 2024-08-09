const express = require('express');

const { getCreatorById } = require('../controllers/Usercontroller');

const router = express.Router();


router.get('/creator/:id',getCreatorById )
module.exports = router;
