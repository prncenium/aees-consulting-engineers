import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import contactHandler from './api/contact.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env.local') });

// Set NODE_ENV to development for local testing (unless explicitly set to production)
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Routes
app.post('/api/contact', async (req, res) => {
  try {
    await contactHandler(req, res);
  } catch (error) {
    console.error('API error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`\n✓ API server running on http://localhost:${PORT}`);
  console.log(`  Make sure Vite is also running (npm run dev in another terminal)\n`);
});
