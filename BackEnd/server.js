const express = require('express');
const app = express();
const port = 4000;

const cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Connecting to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://123:123@lab7.hrs0y.mongodb.net/?retryWrites=true&w=majority&appName=Lab7');


//Defining data model and schema
const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String
});

const Movie = mongoose.model('Movie', movieSchema);

//Method to add new movie records
app.post('/api/movies', async (req, res)=>{

  const { title, year, poster } = req.body;
 
  const newMovie = new Movie({ title, year, poster });
  await newMovie.save();
 
  res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
  })

//retrieving data
app.get('/api/movies', async (req, res) => {
  const movies = await Movie.find({});
  res.json(movies);
});

//Retrieving data by id
app.get('/api/movies/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.send(movie);
});

app.put('/api/movies/:id', async (req, res) => {
  let movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(movie);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});