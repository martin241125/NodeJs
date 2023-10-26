import express, { json } from 'express'
import { randomUUID } from 'node:crypto'
import {validateMovie, validatePartialMovie} from './schema/movies.js '
import { createRequire } from 'node:module'
import { moviesRouter } from './routes/movies'

const require = createRequire(import.meta.url)
const movies = require('./movies.json')


 
const app = express()

app.disable('x-powered-by')
app.use(json())



app.use('/movies', moviesRouter )
    
    app.get('/movies/:id', (req, res) => {
        const { id } = req.params
        const movie = movies.find(movie => movie.id === id)
        if(movie) return res.json({message: 'todo fue bien', movie})
        
        res.status(404).json({mesage: '404 NOT FOUND'})
    })
    
    app.post('/movies', (req, res) => {
       const result = validateMovie(req.body)

       if (result.error) {
        return res.status(400).json({ error: result.error.message })
       }

        const newMovie = {
            id : randomUUID(), 
            ...result.data
        }

        
        movies.push(newMovie)

        res.status(201).json(newMovie) // actualizar la cache del cliente
    })

    app.patch('/movies/:id', (req, res) => {
        const result = validatePartialMovie(req.body)
        
        if(!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message)})  
        }

        const { id } = req.params
        const movieIndex = movies.findIndex(movie => movie.id === id)

        if ( movieIndex === -1) {
            return res.status(404).json({
                message: 'Movie not found'
            })
        }

        const updateMovie = {
            ...movies[movieIndex],
            ...result.data
        }

        movies[movieIndex] = updateMovie

        return res.json(updateMovie)
    })



const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening  port http://localhost:${PORT}`)
})