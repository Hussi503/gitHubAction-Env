import { Router } from 'express';
import { getDatabase } from '../data/database.js';

const router = Router();

// GET all events
router.get('/', async (req, res) => {
  try {
    const db = await getDatabase(); // Wait for DB connection
    const allEvents = await db.collection('events').find().toArray();
    res.json({ events: allEvents });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new event
router.post('/', async (req, res) => {
  try {
    const db = await getDatabase(); // Wait for DB connection
    const eventData = req.body;
    const result = await db.collection('events').insertOne({ ...eventData });
    res.status(201).json({
      message: 'Event created.',
      event: { ...eventData, id: result.insertedId },
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
