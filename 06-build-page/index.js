const fs = require('fs')
const path = require('path')

const pathFile = path.join(__dirname, 'template.html')
const newPathDir = path.join(__dirname, 'project-dist')
const componentsPath = path.join(__dirname, 'components')
const stylePath = path.join(__dirname, 'styles')
const assetsPath = path.join(__dirname, 'assets')
const newAssetsPath = path.join(newPathDir, 'assets')

const func = async () => {
  try {
    await fs.promises.mkdir(newPathDir, {recursive: true})
    await fs.promises.mkdir(newAssetsPath, {recursive: true})

    let templateData = await fs.promises.readFile(pathFile, 'utf-8')
    let stylesData =''

    const htmlFiles = await fs.promises.readdir(componentsPath)
    const sccFiles = await fs.promises.readdir(stylePath)
    const assetsFolders = await fs.promises.readdir(assetsPath)

    await Promise.all(htmlFiles.map(async file => {
      const fileData = await fs.promises.readFile(componentsPath + '\\' + file, 'utf-8')
      const fileName = path.parse(componentsPath + '\\' + file).name
      const reg = new RegExp(`{{${fileName}}}`, 'g')
      templateData = templateData.replace(reg, fileData)
      return
    }))

    await Promise.all(sccFiles.map(async file => {
      const fileData = await fs.promises.readFile(stylePath + '\\' + file, 'utf-8')
      stylesData += fileData + '\n'
      return
    }))

    await Promise.all(assetsFolders.map(async folder => {
      const files = await fs.promises.readdir(assetsPath + '\\' + folder)
      await fs.promises.mkdir(newAssetsPath + '\\' + folder, {recursive: true})
      return await Promise.all(files.map(async file => {
        return await fs.promises.copyFile(assetsPath+ '\\' + folder + '\\' + file, newAssetsPath + '\\' + folder + '\\'  +  file)
      })) 
    }))

    await fs.promises.writeFile(newPathDir + '\\' + 'index.html', templateData)
    await fs.promises.writeFile(newPathDir + '\\' + 'style.css', stylesData.trim())
  } catch(err) {
    console.log(err)
  }
}

func()