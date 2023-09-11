const express = require('express');
const app = express();
const port = process.env.PORT || 5150;

app.get('/api/entries/:id', (req, res) => {

  res.json({ message: 'Hello from Express.js, ENTRIES:ID' });
});

app.get('/api/entries', (req, res) => {
  res.json({ message: 'Hello from Express.js, ENTRIES' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express.js' });
});


app.post('/create', (req, res) => {
  res.json({ message: 'Hello from Express.js, CREATE' });
});

app.put('/update/:id', (req, res) => {
  res.json({ message: 'Hello from Express.js, UPDATE' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});