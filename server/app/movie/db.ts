import { PrismaClient } from '@prisma/client';
import { Movie } from './schema';

const prisma = new PrismaClient();

const createData = async (data: Movie) => {
  try {
    const movie: Movie = await prisma.movie.create({
      data: data
    });
    return {
      success: true,
      movie
    };
  } catch (err) {
    const error = err.message;
    return {
      success: false,
      error
    };
  }
};

const updateData = async (movieId: number, data: Partial<Movie>) => {
  try {
    const movie: Movie = await prisma.movie.update({
      where: {
        id: movieId
      },
      data: data
    });
    return {
      success: true,
      movie
    };
  } catch (err) {
    const error = err.message;
    return {
      success: false,
      error
    };
  }
};

const deleteData = async (movieId: number) => {
  try {
    const movie: Movie = await prisma.movie.delete({
      where: {
        id: movieId
      }
    });
    return {
      success: true,
      movie
    };
  } catch (err) {
    const error = err.message;
    return {
      success: false,
      error
    };
  }
};

export = {
  createData,
  updateData,
  deleteData
};
