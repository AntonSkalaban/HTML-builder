const fs = require('fs')
const path = require('path')

const pathDir = path.join(__dirname, 'files')
const newPathDir = path.join(__dirname, 'files-copy')

const func = async () => {
  try {
    await fs.promises.mkdir(newPathDir, {recursive: true})
    const dirFiles = await fs.promises.readdir(pathDir)

    await Promise.all(dirFiles.map(async file => {
      return await fs.promises.copyFile(pathDir + '\\' + file, newPathDir + '\\' + file)
    }))

    const newDirFiles = await fs.promises.readdir(newPathDir)

    await Promise.all(newDirFiles.map(async file => {
      if(!dirFiles.includes(file)){
        await fs.promises.unlink(newPathDir + '\\' + file)
      }
      return
    }))

  } catch(err) {
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
