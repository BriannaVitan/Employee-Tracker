// boilerplate express app
// copying from activity 23

// typescript! from Module 9, Activity 21
import express, { type Request, type Response } from 'express';

import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';
// import { connectToDb } from './connection.js';

import { addMovie } from './movieService.js';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// GET all movies
app.get('/api/movies', (_req: Request, res: Response) => {
  console.log('getting all the movies');
  
  pool.query('SELECT * FROM movies', (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else if (result) {
      // console.log(result.rows);
      console.table(result.rows);

      res.status(200).json(result.rows);
    }
  });
  
  // res.status(201).send("TODO: Get movies");
  // DONE!
})

// GET all review
app.get('/api/movie-reviews', (_req: Request, res: Response) => {
  console.log('getting all the movie reviews');

  pool.query('SELECT * FROM reviews', (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else if (result) {
      // console.log(result.rows);
      res.status(200).json(result.rows);
    }
  });

  // res.status(202).send("TODO: Get movie reviews");
})

// POST to add-movie to create a new movie
app.post('/api/add-movie', (req: Request, res: Response) => {
  console.log('adding a movie');

  const movie_name = req.body.movie_name;

  return addMovie(movie_name, pool, res);


  // res.status(204).send("TODO: Add a movie");
});

// DELETE to delete a movie
app.delete('/api/movie/:id', (req: Request, res: Response) => {
  console.log(`deleting movie ${req.params.id}`);

  res.status(203).send("TODO: DELETE a movie");
})

// Hardcoded query: DELETE FROM course_names WHERE id = 3;
// const recordToDelete = 3;
// const recordToDeleteSoBad = `3; drop database student_db;`;

// pool.query(`DELETE FROM course_names WHERE id = $1`, [recordToDelete], (err: Error, result: QueryResult) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(`${result.rowCount} row(s) deleted!`);
//   }
// });

// Query database
// pool.query('SELECT * FROM course_names', (err: Error, result: QueryResult) => {
//   if (err) {
//     console.log(err);
//   } else if (result) {
//     console.log(result.rows);
//   }
// });

// Default response for any other request (Not Found)
app.use((_req, res) => {
  res.status(418).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
