const fs = require('node:fs')

const libro = fs.statSync('../ficheros/saintSeiya.txt')

console.log(
    libro.isFile(), //si es un fichero
    libro.isDirectory(), //si es un directorio
    libro.isSymbolicLink(), //si es un enlace simbólico
    libro.size //tamaño del archivo
)