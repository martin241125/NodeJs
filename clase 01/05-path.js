const path = require('node:path')

//unir rutas con path.join 

const filePath = path.join('content', 'subfolder', 'text.txt')
console.log(filePath)

//nombre del fichero
const base = path.basename('/tmp/martin-secret-files/password.txt')
console.log(base)

//nombre del fichero sin la extension
const fileName = path.basename('/tmp/martin/jose.txt' , '.txt')
console.log(fileName)

//extencion del archivo
const extension = path.extname('my.super.image.jpg')
console.log(extension)