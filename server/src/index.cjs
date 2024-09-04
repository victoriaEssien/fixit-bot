const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  // Import the CORS middleware
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Use CORS middleware
app.use(express.json());

// Define allowed origins
const allowedOrigins = ['http://localhost:5173', 'https://fixit-bot.vercel.app'];

// Use CORS middleware with dynamic origin checking
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = await response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    console.error('Error processing the AI response:', error);
    res.status(500).json({ error: 'Failed to process the AI response' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
