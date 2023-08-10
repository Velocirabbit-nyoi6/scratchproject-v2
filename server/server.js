const express = require('express');
const path = require('path');
// const cors = require('cors');

const app = express();
// app.use(cors());
const port = 3000;

const apiRouter = require('./routes/apiRouter');

app.use(express.json());

// serve static assets from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

//route to SQL for any requests to the /places endpoint
app.use('/api', apiRouter)

// serve index.html for any unmatched route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
