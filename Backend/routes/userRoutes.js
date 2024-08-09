const express = require('express');

const { getCreatorById, getInstagramData, } = require('../controllers/Usercontroller');

const router = express.Router();


router.get('/creator/:id',getCreatorById )
router.get('/instagram/:url/:userId',getInstagramData )

module.exports = router;
