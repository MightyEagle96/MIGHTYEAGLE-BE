import express from 'express';
const successRouter = express.Router();

successRouter
  .get('/', (req, res) =>
    res.status(200).json({
      message: 'Hi from the backend',
      requestedAt: new Date().toDateString(),
    })
  )
  .post('/upload', (req, res) => {
    res.status(201).json({ message: 'Downloaded' });
  });

export default successRouter;
