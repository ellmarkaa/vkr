import {model, Schema} from 'mongoose'

export interface IFile extends Document {
  name: string;
  type: string;
  accessLink?: string;
  size: number;
  path: string;
  date: Date;
  user: Schema.Types.ObjectId;
  parent?: Schema.Types.ObjectId;
  childs: Schema.Types.ObjectId[];
}


const FileSchema = new Schema<IFile>({
    name: {type: String, required: true},
    type: {type: String, required: true},
    accessLink: {type:String},
    size: {type: Number, default: 0},
    path: {type: String, default: ''},
    date: {type: Date, default: Date.now()},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    parent: {type: Schema.Types.ObjectId, ref: 'File'},
    childs: [{type: Schema.Types.ObjectId, ref: 'File'}],
})

export const File = model('File', FileSchema)
