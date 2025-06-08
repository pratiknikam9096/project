const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas URI with password included
const mongoURI = "mongodb+srv://nikampratik2989:nikampratik2989@cluster0.rm8lmet.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let isConnected = false;

// Schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now }
});

const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

// Connect to MongoDB Atlas
async function connectDB() {
  if (!isConnected) {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = true;
    console.log("✅ Connected to MongoDB Atlas");
  }
}

// GET Feedbacks
app.get('/api/feedback', async (req, res) => {
  await connectDB();
  try {
    const limit = parseInt(req.query.limit) || 5;
    const feedbacks = await Feedback.find().sort({ date: -1 }).limit(limit);
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});

// POST Feedback
app.post('/api/feedback', async (req, res) => {
  await connectDB();
  try {
    const { name, rating, comment } = req.body;

    if (!name || rating == null || !comment) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newFeedback = new Feedback({ name, rating, comment });
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    res.status(500).json({ error: 'Server error while saving feedback' });
  }
});

module.exports = app;
module.exports.handler = serverless(app);
