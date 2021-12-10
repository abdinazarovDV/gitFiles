const fs = require('fs')
let DB = JSON.parse(fs.readFileSync('./.hide/data.json', 'utf-8'))

let id = process.argv[2]

fs.writeFileSync(DB[id].file, DB[id].text)