const Offer = require('../models/Offers');

// Create Offer
exports.createOffer = async (req, res) => {
  const { lastName,creatorId, Offerprice, businessemail, Phonenumber, Offerdescription, status="pending" } = req.body;

  try {
    const newOffer = new Offer({
      lastName,
      Offerprice,
      creatorId,
      businessemail,
      Phonenumber,
      Offerdescription,
      status
    });

    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getOffersByUserId = async (req, res) => {
  try {
    
    const userId = req.userId; 
    const offers = await Offer.find({ creatorId: userId });
    res.status(200).json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
exports.updateOfferStatus = async (req, res) => {
  const { offerId } = req.params;
  const { status } = req.body;

  // Validate the status
  const validStatuses = ['accepted', 'declined'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status. Status must be "accepted" or "declined".' });
  }

  try {
    const updatedOffer = await Offer.findByIdAndUpdate(
      offerId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedOffer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    res.status(200).json(updatedOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
exports.deleteOffer = async (req, res) => {
  const { offerId } = req.params;

  try {
    const deletedOffer = await Offer.findByIdAndDelete(offerId);

    if (!deletedOffer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
