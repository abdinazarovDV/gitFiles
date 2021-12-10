import fs from 'fs';
import path from 'path';
let DB = JSON.parse(fs.readFileSync('./.hide/data.json', 'utf-8'))
let arrayPath = []

function readPath(directory) {
    let pahtDir = fs.readdirSync(directory, {withFileTypes: true})

    pahtDir.forEach( file => {
        // likely GitIgnore
        if(!['.hide', 'watch.mjs', 'restore.js'].includes(file.name)) {
            if(file.isDirectory()) {
                return readPath(path.join(directory , file.name))
            }
            arrayPath.push(path.join(directory , file.name))
        }
    })
}

readPath(process.cwd())
console.log("Files are being watching...")
arrayPath.forEach( file => {
    let base_file = path.parse(file).base

    fs.watchFile(file,{interval: 100} ,(per, cer) => {

        let id = new Date() % 1000000
        let text = fs.readFileSync(file, 'utf-8')
        DB[id] = {
            text,
            file
        }
        console.log(`: ${base_file} was changed: ${id}\n${text}`);
        fs.writeFileSync('./.hide/data.json', JSON.stringify(DB, null, 4))
    })
})
