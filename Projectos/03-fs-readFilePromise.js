const fs = require('node:fs/promises')

console.log('leyendo archivo...')
fs.readFile('../ficheros/saintseiya.txt', 'utf-8')
.then(text => {
    console.log('primer texto:', text)
})

console.log('leyendo segundo archivo...')
fs.readFile('../ficheros/compras.txt', 'utf-8')
.then(text => {
    console.log('segundo texto:', text)
})