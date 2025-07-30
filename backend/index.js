import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';

const app = express();
const PORT = 5000;

const urlDatabase = new Map();

app.use(cors());
app.use(express.json());

app.post('/api/shorten', (req, res) => {
  const { originalUrl } = req.body;
  const shortId = nanoid(6);
  urlDatabase.set(shortId, originalUrl);
  res.json({ shortUrl: `http://localhost:5000/${shortId}` });
});

app.get('/:shortId', (req, res) => {
  const { shortId } = req.params;
  const originalUrl = urlDatabase.get(shortId);
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});