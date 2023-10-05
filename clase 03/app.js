const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const z = require('zod')

const app = express()
app.disable('x-powered-by')
app.use(express.json())


app.get('/movies', (req, res) => {
    const { rate } = req.query
    if ( rate ) {
        const filteredRate = movies.filter(
            movie => movie.rate 

        )
        return res.json({
            msg: 'hola',
            filteredRate
        })
    }
    res.json(movies)
})

app.get('/movies', (req, res) => {
    const { genre } = req.query
    if ( genre ) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
            return res.json(filteredMovies)
        }
        res.json(movies)
    })
    
    app.get('/movies/:id', (req, res) => {
        const { id } = req.params
        const movie = movies.find(movie => movie.id === id)
        if(movie) return res.json(movie)
        
        res.status(404).json({mesage: '404 NOT FOUND'})
    })
    
    app.post('/movies', (req, res) => {
        const movieSchema = z.object({
            title: z.string({
                invalid_type_error:'Movie title must be a string.',
                required_error: 'Movie title is required.'
            }),
            year: z.number().int().min(1900).max(2024),
            director: z.string(),
            duration: z.number().int().positive(),
            rate: z.number().min(0).max(10),
            poster: z.string().url({
                message: 'Poster must be a valid URL'
            }),
            genre: z.array(
                z.enum(['Action', 'Adventure', 'Comedy', 'Fantasy', 'Drama', 'Horror', 'Thriller', 'Sci-Fi']),
                {
                    required_error: 'Movies genre is required.',
                    invalid_type_error: 'Movie genre must be an array of enum Genre'
                }
            )
        })
        const {
            title,
            genre,
            director,
            year,
            duration,
            rate,
            poster
        } = req.body

        const newMovie = {
            id : crypto.randomUUID(), 
            title,
            genre,
            director,
            year,
            duration,
            rate : rate ?? 0,
            poster
        }

        
        movies.push(newMovie)

        res.status(201).json(newMovie) // actualizar la cache del cliente
    })



const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})