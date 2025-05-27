import config from "config";
import jwt from 'jsonwebtoken'
import {NextFunction, Response, Request} from "express";

export const authMiddleware = (req: Request<{user: any}, {user: any}>, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).json({message: 'Auth error'})
    return
  }

  try {
    const token = authorization.split(' ')[1]
    if (!token) {
      res.status(401).json({message: 'Auth error'})
      return
    }
    const decoded = jwt.verify(token, config.get('secretKey'))
    // @ts-ignore
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({message: 'Auth error'})
    return
  }
}
