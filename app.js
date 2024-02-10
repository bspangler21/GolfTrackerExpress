const express = require('express');

// Create an Express application
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});

