import { Response } from 'express';
import createAPIError from '../utils/error';
import Movie from './db';

const createMovie = async (req: any, res: Response) => {
  if (!req.user) {
    return createAPIError(400, 'Error accessing data!', res);
  }
  const userId = req.user.id;
  const { name, rating, cast, genre, releaseDate } = req.body;
  if (!name) {
    return createAPIError(400, `Please provide the name of the movie!`, res);
  }
  if (!rating) {
    return createAPIError(400, `Please provide the rating of the movie!`, res);
  }
  if (!cast || cast.length === 0 || cast[0].length === 0) {
    return createAPIError(400, `Please provide the cast of the movie!`, res);
  }
  if (!genre) {
    return createAPIError(400, `Please provide the genre of the movie!`, res);
  }
  if (!releaseDate) {
    return createAPIError(
      400,
      `Please provide the releaseDate of the movie!`,
      res
    );
  }
  const response = await Movie.createData({
    name,
    rating,
    cast,
    genre,
    releaseDate,
    userId
  });
  if (response.success) {
    return res.status(200).json({
      success: response.success,
      movie: response.movie
    });
  }
  createAPIError(400, response.error, res);
};

const updateMovie = async (req: any, res: Response) => {
  if (!req.user) {
    return createAPIError(400, 'Error accessing data!', res);
  }
  const { movieId, name, rating, cast, genre, releaseDate } = req.body;
  if (!movieId) {
    return createAPIError(
      400,
      `Please provide the movie id you want to update!`,
      res
    );
  }
  if (!name) {
    return createAPIError(400, `Please provide the name of the movie!`, res);
  }
  if (!rating) {
    return createAPIError(400, `Please provide the rating of the movie!`, res);
  }
  if (!cast || cast.length === 0 || cast[0].length === 0) {
    return createAPIError(400, `Please provide the cast of the movie!`, res);
  }
  if (!genre) {
    return createAPIError(400, `Please provide the genre of the movie!`, res);
  }
  if (!releaseDate) {
    return createAPIError(
      400,
      `Please provide the releaseDate of the movie!`,
      res
    );
  }
  const response = await Movie.updateData(movieId, {
    name,
    rating,
    cast,
    genre,
    releaseDate
  });
  if (response.success) {
    return res.status(200).json({
      success: response.success,
      movie: response.movie
    });
  }
  createAPIError(400, response.error, res);
};

const deleteMovie = async (req: any, res: Response) => {
  if (!req.user) {
    return createAPIError(400, 'Error accessing data!', res);
  }
  const { movieId } = req.body;
  if (!movieId) {
    return createAPIError(
      400,
      `Please provide the movie id you want to delete!`,
      res
    );
  }
  const response = await Movie.deleteData(movieId);
  if (response.success) {
    return res.status(200).json({
      success: response.success,
      movie: response.movie
    });
  }
  createAPIError(400, response.error, res);
};

export = {
  createMovie,
  updateMovie,
  deleteMovie
};
