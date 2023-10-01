const express = require('express')

const app = express()
app.disable('x-powered-by')

app.get('/', (req, res) => {
    res.json({
        message: 'hola mundo'
    })
})

app.get('/contacto', (req, res) => {
    res.json({
        message: 'Hola desde el contacto'
    })
})

app.get('/formulario', (req, res) => {
    res.json({
        message: 'Hola desde el formulario'
    })
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})