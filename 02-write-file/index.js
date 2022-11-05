const fs = require('fs') 
const path = require('path') 
const readline = require('node:readline'); 
 
const { stdin: input, stdout: output } = require('node:process'); 
const rl = readline.createInterface({ input, output }); 

  const func = () => {

    const rlClose = () => {
      console.log('выводится прощальная фраза и процесс завершается.')
      rl.close()
     }

    console.log('What do you think of Node.js?')

    rl.on('line', (line) => {
      if(line !== 'exit') {
        fs.promises.appendFile(path.resolve(__dirname, 'file.txt'), line) 
      } else {
        rlClose()
      }
    })

    rl.on('SIGINT', () => rlClose())
  }
  
   
  func()
