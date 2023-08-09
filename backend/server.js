// Server-side code (index.js)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');


//routes
const userRoutes = require('./routes/user');
const memoryGameRouter = require('./routes/memoryGame');
const sudokuGameRouter = require('./routes/sudoku');
const cloudinaryGameImgsRouter = require('./routes/cloudinaryGameImgs');


//middlewares
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Create an express app
const app = express();



// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});




//routes
app.use('/user',userRoutes);
app.use('/memoryGame',memoryGameRouter);
app.use('/sudoku',sudokuGameRouter);
app.use("/cloudoinaryGamesImgs",cloudinaryGameImgsRouter);


// Connect to the database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Create an HTTP server
    const server = http.createServer(app);
    // Start the server
    server.listen(process.env.PORT, () => {
      console.log('Listening on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
