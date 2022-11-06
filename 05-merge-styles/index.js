const fs = require('fs')
const path = require('path')

const pathDir = path.join(__dirname, 'styles')
const newPathDir = path.join(__dirname, 'project-dist')

const func = async () => {
    try {
        await fs.promises.mkdir(newPathDir, {recursive: true})
        const dirFiles = await fs.promises.readdir(pathDir)
        const styles = []

        dirFiles.forEach(file => {
          const obj = path.parse(file)
          if(obj.ext === '.css') {

           (async () => {
            const data = await fs.promises.readFile(pathDir + '\\' + file, 'utf8')
            styles.push(data)
            styles.forEach(data => {
                fs.promises.writeFile(newPathDir + '\\' + 'bundle.css', '')
                fs.promises.appendFile(newPathDir + '\\' + 'bundle.css', data + '\n')
            })
            })()
        }
    })
    } catch(err) {
        console.log(err)
    }
}

func()