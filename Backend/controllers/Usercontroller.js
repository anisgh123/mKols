

const { default: axios } = require('axios');
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

const RAPIDAPI_HOST = 'instagram-scraper-api2.p.rapidapi.com';
const RAPIDAPI_KEY = 'c0adcbb9a0msh3918de9314de58ap1d59f0jsnde35c617244d';

exports.getInstagramData = async (req, res) => {
  const { url, userId } = req.params; // Extract ID from request parameters
  console.log(userId)
  try {
    const response = await axios.get(`https://${RAPIDAPI_HOST}/v1/info?username_or_id_or_url=${url}`, {
      headers: {
        'X-RapidAPI-Host': RAPIDAPI_HOST,
        'X-RapidAPI-Key': RAPIDAPI_KEY
      }
    });
    console.log(response.data)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { followers: response.data.data.follower_count, avatar: response.data.data.profile_pic_url, following: response?.data?.data.following_count, category: response?.data?.data.category, is_business: response?.data?.data.is_business,is_verified_account:response?.data?.data.is_verified },
      { new: true, runValidators: true } // Return the updated document

    );
    const profiles = response;

    res.status(200).json(profiles.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
exports.getClicksData = async (req, res) => { 
  const { bitlink } = req.query;
  const accessToken = "aae9d09ddd1b604e4653be05b3dd50a1d0a98b16";

  try {
    const response = await axios.get(`https://api-ssl.bitly.com/v4/bitlinks/bit.ly/${bitlink}/clicks`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    // Send the Bitly data back as a response
    res.json(response.data);

  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: 'Error fetching data from Bitly', error: error.message });
  }
};