import { Router } from "express";

export const moviesRouter = Router()

moviesRouter.get('/', (req, res) => {
    const { genre } = req.query
    if ( genre ) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
            return res.json(filteredMovies)
        }
        res.json(movies)
    })