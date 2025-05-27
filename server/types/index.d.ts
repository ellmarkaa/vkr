import {Schema} from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: Schema.Types.ObjectId;
        email?: string;
      };
    }
  }
}
