const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/signupDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB error:", err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('User', UserSchema);

app.post('/api/signup', async (req, res) => {
  try {
    const user = new User({ name: req.body.name, email: req.body.email });
    await user.save();
    res.status(200).json({ message: 'User saved' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save user' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));