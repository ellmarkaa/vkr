import {Request, Response} from 'express'
import {fileService} from '../services/fileService'
import config from 'config'
import fs from 'fs'
import {User} from '../models/User'
import {File, IFile} from '../models/File'
import uuid from 'uuid'
import {HydratedDocument} from "mongoose";

class FileController {
  async createDir(req: Request, res: Response) {
    try {
      const {name, type, parent} = req.body
      // @ts-ignore
      const file = new File<IFile>({name, type, parent, user: req.user.id})
      const parentFile = await File.findOne({_id: parent})
      if(!parentFile) {
        file.path = name
        await fileService.createDir(file)
      } else {
        file.path = `${parentFile.path}\\${file.name}`
        await fileService.createDir(file)
        // @ts-ignore
        parentFile.childs.push(file._id)
        await parentFile.save()
      }
      await file.save()
      res.json(file)
    } catch (e) {
      console.log(e)
      res.status(400).json(e)
    }
  }

  async getFiles(req: Request, res: Response) {
    try {
      const {sort} = req.query
      let files
      switch (sort) {
        case 'name':
          // @ts-ignore
          files = await File.find({user: req.user.id, parent: req.query.parent}).sort({name:1})
          break
        case 'type':
          // @ts-ignore
          files = await File.find({user: req.user.id, parent: req.query.parent}).sort({type:1})
          break
        case 'date':
          // @ts-ignore
          files = await File.find({user: req.user.id, parent: req.query.parent}).sort({date:1})
          break
        default:
          // @ts-ignore
          files = await File.find({user: req.user.id, parent: req.query.parent})
          break;
      }
      res.json(files)
    } catch (e) {
      console.log(e)
      res.status(500).json({message: "Can not get files"})
    }
  }

  async uploadFile(req: Request, res: Response) {
    try {
      // @ts-ignore
      const file = req.files.file

      // @ts-ignore
      const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
      // @ts-ignore
      const user = await User.findOne({_id: req.user.id})

      // @ts-ignore
      if (user.usedSpace + file.size > user.diskSpace) {
        res.status(400).json({message: 'There no space on the disk'})
        return
      }

      // @ts-ignore
      user.usedSpace = user.usedSpace + file.size

      let path;
      if (parent) {
        // @ts-ignore
        path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${file.name}`
      } else {
        // @ts-ignore
        path = `${config.get('filePath')}\\${user._id}\\${file.name}`
      }

      if (fs.existsSync(path)) {
        res.status(400).json({message: 'File already exist'})
        return
      }
      // @ts-ignore
      file.mv(path)

      // @ts-ignore
      const type = file.name.split('.').pop()
      // @ts-ignore
      let filePath = file.name
      if (parent) {
        // @ts-ignore
        filePath = parent.path + "\\" + file.name
      }
      const dbFile = new File({
        // @ts-ignore
        name: file.name,
        type,
        // @ts-ignore
        size: file.size,
        path: filePath,
        parent: parent?._id,
        // @ts-ignore
        user: user._id
      });

      await dbFile.save()
      // @ts-ignore
      await user.save()

      res.json(dbFile)
    } catch (e) {
      console.log(e)
      res.status(500).json({message: "Upload error"})
    }
  }

  async downloadFile(req: Request, res: Response) {
    try {
      const file = await File.findOne({_id: req.query.id, user: req.user.id})
      if (!file) {
        res.send(401).json('no such file')
        return
      }

      const path = fileService.getPath(file)
      if (fs.existsSync(path)) {
        return res.download(path, file.name)
      }
      return res.status(400).json({message: "Download error"})
    } catch (e) {
      console.log(e)
      res.status(500).json({message: "Download error"})
    }
  }

  async deleteFile(req: Request, res: Response) {
    try {
      const file = await File.findOne({_id: req.query.id, user: req.user.id}) as HydratedDocument<IFile>;
      if (!file) {
        return res.status(400).json({message: 'file not found'})
      }
      fileService.deleteFile(file)
      await File.deleteOne({_id: file._id})
      return res.json({message: 'File was deleted'})
    } catch (e) {
      console.log(e)
      return res.status(400).json({message: 'Dir is not empty'})
    }
  }

  async searchFile(req: Request, res: Response) {
    try {
      const searchName = req.query.search as string
      if (!searchName) return res.json([])
      let files = await File.find({user: req.user.id})
      files = files.filter(file => file.name.includes(searchName))
      return res.json(files)
    } catch (e) {
      console.log(e)
      return res.status(400).json({message: 'Search error'})
    }
  }

  async uploadAvatar(req: Request, res: Response) {
    try {
      const file = req.files?.file
      if (!file) return res.status(401).json({message: 'no file'})

      const user = await User.findById(req.user.id)
      if (!user) return res.status(401).json({message: 'no user'})

      const avatarName = uuid.v4() + ".jpg"
      // @ts-ignore
      file.mv(config.get('staticPath') + "\\" + avatarName)
      user.avatar = avatarName
      await user.save()
      return res.json(user)
    } catch (e) {
      console.log(e)
      return res.status(400).json({message: 'Upload avatar error'})
    }
  }

  async deleteAvatar(req: Request, res: Response) {
    try {
      const user = await User.findById(req.user.id)
      if (!user) return res.status(401).json({message: 'no user'})

      fs.unlinkSync(config.get('staticPath') + "\\" + user.avatar)
      user.avatar = null
      await user.save()
      return res.json(user)
    } catch (e) {
      console.log(e)
      return res.status(400).json({message: 'Delete avatar error'})
    }
  }
}

export const fileController = new FileController()
