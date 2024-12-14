import * as express from 'express';
import * as cors from 'cors';
import { GiftIdeasService } from '@secret-santa/shared/api';
import { GiftIdea } from '@secret-santa/shared/types';

const app = express();

app.use(cors());
app.use(express.json());

// Get all gift ideas
app.get('/api/gift-ideas', async (req, res) => {
  const ideas = await GiftIdeasService.getAllIdeas();
  res.json(ideas);
});

// Get gift idea by ID
app.get('/api/gift-ideas/:id', async (req, res) => {
  const idea = await GiftIdeasService.getIdeaById(req.params.id);
  if (!idea) {
    res.status(404).json({ message: 'Gift idea not found' });
    return;
  }
  res.json(idea);
});

// Create new gift idea
app.post('/api/gift-ideas', async (req, res) => {
  const newIdea = await GiftIdeasService.createIdea(req.body);
  res.status(201).json(newIdea);
});

// Update gift idea status
app.patch('/api/gift-ideas/:id/status', async (req, res) => {
  const { status } = req.body;
  const updatedIdea = await GiftIdeasService.updateIdeaStatus(req.params.id, status);
  if (!updatedIdea) {
    res.status(404).json({ message: 'Gift idea not found' });
    return;
  }
  res.json(updatedIdea);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}/api`);
});

server.on('error', console.error);