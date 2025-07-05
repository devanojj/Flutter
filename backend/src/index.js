import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';


// Load GEMINI_API_KEY into process.env
dotenv.config(); 

const app = express();
const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(express.json());


// Allow only your front-end to call this API
app.use(cors({ 
  origin: 'http://localhost:5173',  
}));


// Core AI route accept & return result
app.post('/api/explain', async (req, res, next) => { 
  try {
    const { term } = req.body;
    if (!term || typeof term !== 'string') {
      return res.status(400).json({ error: 'Term must be a non-empty string.' });
    }

    const prompt = `
      Explain "${term}" in 2–3 sentences.
      Then list 3 related topics as bullet points.
    `;

    const resp = await client.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    });

    console.log('AI raw response:', JSON.stringify(resp, null, 2));

    // Extract the generated text from the first candidate
    const generated = resp.text;

    if (typeof generated !== 'string') {
    throw new Error('No text returned from AI model');
    }


    // Split into lines, trim, and drop empties
    const lines = generated
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);


    // First line is the explanation
    const explanation = lines.shift();


    // The rest (up to 5) are related topics, bullets stripped
    const related = lines
    .map(l => l.replace(/^[-*]\s*/, ''))
    .slice(0, 5);

    res.json({ explanation, related });

  } catch (err) {
    console.error('Error in /api/explain:', err);
    next(err);
  }
});

// Error handler 
app.use((err, _req, res, _next) => { 
  console.error(err);
  res
    .status(500)
    .json({ error: 'An internal error occurred. Please try again later.' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});