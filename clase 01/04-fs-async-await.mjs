import { readFile } from 'node:fs/promises';

console.log('leyendo archivo...')
const text = await readFile('../ficheros/saintseiya.txt', 'utf-8')

    console.log('primer texto:', text)


console.log('leyendo segundo archivo...')
const secondText = await readFile('../ficheros/compras.txt', 'utf-8')

    console.log('segundo texto:', secondText)
