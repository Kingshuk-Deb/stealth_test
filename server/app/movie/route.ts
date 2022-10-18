import { Router } from 'express';
import Movie from './service';

export const router = Router();

router.post('/', Movie.createMovie);
router.patch('/', Movie.updateMovie);
router.delete('/', Movie.deleteMovie);
