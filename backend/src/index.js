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

// Core AI route: accept { term } and return { explanation, related[] }
app.post('/api/explain', async (req, res, next) => {
  try {
    const { term } = req.body;
    if (!term || typeof term !== 'string') {
      return res.status(400).json({ error: 'Term must be a non-empty string.' });
    }

    const prompt = `
Explain "${term}" in 2–3 sentences.
Then return exactly 3 related topic names, as a JSON array (e.g. ["UDP","Networks","HTTPS"]) and nothing else.
    `;

    const resp = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    console.log('AI raw response:', JSON.stringify(resp, null, 2));

    // Extract the generated text
    const generated = resp.text;
    if (typeof generated !== 'string') {
      throw new Error('No text returned from AI model');
    }

    // Separate explanation from JSON array of related topics
    const jsonMatch = generated.match(/(\[.*\])\s*$/m);
    if (!jsonMatch) {
      throw new Error('Related topics JSON not found in AI output');
    }

    let related;
    try {
      related = JSON.parse(jsonMatch[1]);
      if (!Array.isArray(related)) throw new Error();
    } catch {
      throw new Error('Failed to parse related topics JSON');
    }

    const explanation = generated.slice(0, jsonMatch.index).trim();

    res.json({ explanation, related });
  } catch (err) {
    console.error('Error in /api/explain:', err);
    next(err);
  }
});

// Error handling
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