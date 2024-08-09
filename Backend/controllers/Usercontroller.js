

const User = require('../models/User');

 
exports.getCreatorById = async (req, res) => {
    const { id } = req.params; // Extract ID from request parameters
  
    try {
      const creator = await User.findById(id); // Find user by ID
  
      if (!creator || creator.accountType !== 'creator') {
        return res.status(404).json({ message: 'Creator not found' });
      }
  
      res.status(200).json(creator);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };