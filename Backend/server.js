const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const offerRoutes = require('./routes/offerRoutes');
const taskRoutes = require('./routes/TaskRoutes');
const uploadRoute = require('./routes/uploadRoutes');
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/', userRoutes);
app.use('/api/', offerRoutes);
app.use('/api/', taskRoutes);
// Serve static files from the 'uploads' directory
app.use(express.static(path.join(__dirname, 'uploads')));
// Use the upload route
app.use('/api', uploadRoute);
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(`Connection error: ${error}`));
