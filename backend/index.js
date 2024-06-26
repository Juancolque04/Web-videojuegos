const express = require('express');
const cors = require('cors'); 
const app = express();
const videojuegosRouter = require('./routes/videojuegos');
const connectDB = require('./config/db');

connectDB()

app.use(cors());

app.use(express.json());
app.use('/api/videojuegos', videojuegosRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});