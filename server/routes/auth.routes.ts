import Router, {Request, Response} from "express";
import bcrypt from "bcryptjs";
import {User} from "../models/User";
import {File} from '../models/File';
import config from "config";
import jwt from "jsonwebtoken";
import {check, validationResult} from "express-validator";
import {authMiddleware} from '../middleware/auth.middleware';
import {fileService} from '../services/fileService';
const router = Router()

router.post('/registration',
  [
    check('email', "Uncorrect email").isEmail(),
    check('password', 'Password must be longer than 3 and shorter than 12').isLength({min:3, max:12})
  ],
  async (req: Request, res: Response): Promise<any> => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Uncorrect request", errors})
      }
      const {email, password} = req.body
      const candidate = await User.findOne({email})
      if (candidate) {
        return res.status(400).json({message: `User with email ${email} already exist`})
      }
      const hashPassword = await bcrypt.hash(password, 8)
      const user = new User({email, password: hashPassword})
      await user.save()
      // @ts-ignore
      await fileService.createDir(new File({user:user.id, name: ''}))
      res.json({message: "User was created"})
    } catch (e) {
      console.log(e)
      res.send({message: "Server error"})
    }
  })


router.post('/login',
  async (req, res): Promise<any> => {
    try {
      const {email, password} = req.body
      const user = await User.findOne({email})
      if (!user) {
        return res.status(404).json({message: "User not found"})
      }
      const isPassValid = bcrypt.compareSync(password, user.password)
      if (!isPassValid) {
        return res.status(400).json({message: "Invalid password"})
      }
      // @ts-ignore
      const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar
        }
      })
    } catch (e) {
      console.log(e)
      res.send({message: "Server error"})
    }
  })

router.get('/auth', authMiddleware,
  async (req, res): Promise<any> => {
    try {
      // @ts-ignore
      const user = await User.findOne({_id: req.user.id})
      if (!user) {
        return res.status(400).json({message: "errror"})
      }
      // @ts-ignore
      const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar
        }
      })
    } catch (e) {
      console.log(e)
      res.send({message: "Server error"})
    }
  })


module.exports = router
