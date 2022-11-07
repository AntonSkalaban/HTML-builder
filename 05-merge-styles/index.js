const fs = require('fs')
const path = require('path')

const pathDir = path.join(__dirname, 'styles')
const newPathDir = path.join(__dirname, 'project-dist')

const func = async () => {
  try {
    await fs.promises.mkdir(newPathDir, {recursive: true})
    const dirFiles = await fs.promises.readdir(pathDir)
    let bundleData = ''

    await Promise.all(dirFiles.map( async file => {
      const obj = path.parse(file)
      if(obj.ext === '.css') {
        const data = await fs.promises.readFile(pathDir + '\\' + file, 'utf8')
        bundleData += data + '\n'
      }
    }))

    await fs.promises.writeFile(newPathDir + '\\' + 'bundle.css', bundleData.trim())

  } catch(err) {
    console.log(err)
  }
}

func()