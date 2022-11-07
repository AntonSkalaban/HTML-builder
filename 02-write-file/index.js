const fs = require('fs') 
const path = require('path') 
const readline = require('node:readline'); 
const { stdin: input, stdout: output } = require('node:process'); 
const rl = readline.createInterface({ input, output }); 

const func = () => {
  const rlClose = () => {
    console.log('Goodbye!')
    rl.close()
  }

  console.log('Hello!')

  rl.on('line', (line) => {
    if(line !== 'exit') {
      fs.appendFile(path.resolve(__dirname, 'file.txt'), line, err => {
        if(err) throw err
      })
    } else {
      rlClose()
    }
  })

  rl.on('SIGINT', () => rlClose())
}

func()