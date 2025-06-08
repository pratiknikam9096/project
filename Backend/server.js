const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/local', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// GET: Fetch latest feedbacks (limit = 5 by default)
app.get('/api/feedback', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const feedbacks = await Feedback.find().sort({ date: -1 }).limit(limit);
    res.json(feedbacks);
  } catch (err) {
    console.error('Error fetching feedbacks:', err.message);
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});

// POST: Add new feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    if (!name || rating == null || !comment) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newFeedback = new Feedback({
      name,
      rating,
      comment
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    console.error('Error saving feedback:', err.message);
    res.status(500).json({ error: 'Server error while saving feedback' });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
