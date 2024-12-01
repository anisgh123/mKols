const express = require('express');

const { getCreatorById, getInstagramData,getClicksData } = require('../controllers/Usercontroller');

const router = express.Router();


router.get('/creator/:id',getCreatorById )
router.get('/instagram/:url/:userId',getInstagramData )
router.get('/bit-click',getClicksData )

module.exports = router;
