import fs from 'fs'
import {File, IFile} from '../models/File'
import config from 'config'

class FileService {

  createDir(file: IFile) {
    // @ts-ignore
    const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`
    return new Promise(((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath)
          return resolve({message: 'File was created'})
        } else {
          return reject({message: "File already exist"})
        }
      } catch (e) {
        return reject({message: 'File error'})
      }
    }))
  }

  deleteFile(file: IFile) {
    const path = this.getPath(file)
    if (file.type === 'dir') {
      fs.rmdirSync(path)
    } else {
      fs.unlinkSync(path)
    }
  }

  getPath(file: IFile) {
    return config.get('filePath') + '\\' + file.user + '\\' + file.path
  }
}


export const fileService = new FileService()
