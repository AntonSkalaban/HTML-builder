const fs = require('fs')
const path = require('path')

const pathDir = path.join(__dirname, 'files')
const newPathDir = path.join(__dirname, 'files-copy')

const func = async () => {
    try {
      await fs.promises.mkdir(newPathDir, {recursive: true})
      const dirFiles = await fs.promises.readdir(pathDir)
      dirFiles.forEach(file => fs.promises.copyFile(pathDir + '\\' + file, newPathDir  + '\\' + file))
    }
    catch(err) {
      console.log(err)
    }
}

func()

// fs.mkdir(newPathDir, {recursive: true} , err => {
//     
// })

// fs.readdir(pathDir, (err, files) => {
//      files.forEach((file) => {
//         fs.copyFile(pathDir + '\\' + file, newPathDir  + '\\' + file, err => {
//             if(err) throw err
//         })
//     })
// })
