const http = require('node:http') // protocolo HTTP
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  if (req.url === '/') {
    res.statusCode = 200

    res.end('<h1>Bienvenido a mi pagina de inicio</h1>')
  } else if (req.url === '/contacto') {
    res.statusCode = 200

    res.end('<h1>Bienvenido a la pagina de contacto</h1> <h1>Bienvenido a la pagina d</h1>')
  } else if (req.url === '/imagen-saga.jpg') {
    fs.readFile('./saga.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>Error 500 Internal Server Error </h1>')
      } else {
        res.statusCode = 200
        res.setHeader('Content-Type', 'image/jpg; ')
        res.end(data)
      }
    })
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
