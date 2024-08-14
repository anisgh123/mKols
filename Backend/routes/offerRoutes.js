const express = require('express');

const { createOffer,getOffersByUserId, getBusinessOffers ,deleteOffer,updateOfferStatus} = require('../controllers/Offercontroller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/offer',createOffer )
router.get('/userOffers',authMiddleware,getOffersByUserId )
router.get('/businessOffer',getBusinessOffers )
router.delete('/offer/:id',deleteOffer )
router.put('/offer/:id',updateOfferStatus )

module.exports = router;
