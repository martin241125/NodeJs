const fs = require('node:fs')

const text = fs.readFileSync('../ficheros/saintSeiya.txt', 'utf-8')

console.log(text)