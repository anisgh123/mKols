const express = require('express');

const { createOffer,getOffersByUserId } = require('../controllers/Offercontroller');
const authMiddleware = require('../middleware/authMiddleware');
const { Routes } = require('react-router-dom');

const router = express.Router();


router.post('/offer',createOffer )
router.get('/userOffers',authMiddleware,getOffersByUserId )

module.exports = router;
