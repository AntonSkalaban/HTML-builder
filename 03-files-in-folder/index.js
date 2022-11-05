const fs = require('fs');
const path = require('path');

const pathFolder = __dirname + '/secret-folder'

fs.readdir(pathFolder, (err, files) => {
    if(err) throw err
      files.forEach(file => { 
      const obj = path.parse(file)
        fs.stat(pathFolder+'/'+file, (err,stats) => {
          if(err) throw err
          if(stats.isFile()) {
          console.log(`${obj.name} - ${obj.ext.substring(1)} - ${stats.size}B`)
        }
        })
       
      } 
     )})

 