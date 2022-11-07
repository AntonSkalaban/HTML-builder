const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'secret-folder')

const func = async () => {
  try {
    const files = await fs.promises.readdir(pathFolder)
    await Promise.all(files.map(async file => { 
      const obj = path.parse(file)
      const stats = await fs.promises.stat(pathFolder+'\\'+file)
        if(stats.isFile()) {
        console.log(`${obj.name} - ${obj.ext.substring(1)} - ${stats.size}B`)
        }
    }))
  } catch(err) {
    console.log(err)
  }
}

func()

// fs.readdir(pathFolder, (err, files) => {
//   if(err) throw err
//     files.map(file => { 
//     const obj = path.parse(file)
//       fs.stat(pathFolder+'\\'+file, (err,stats) => {
//         if(err) throw err
//         if(stats.isFile()) {
//         console.log(`${obj.name} - ${obj.ext.substring(1)} - ${stats.size}B`)
//       }
//       })
//     }
//   )
// })