import { Schema, model, Document, Types } from "mongoose";

// Интерфейс для User
export interface IUser extends Document {
  email: string;
  password: string;
  diskSpace: number;
  usedSpace: number;
  avatar: string | null;
  files: Types.ObjectId[]; // ссылки на файлы
}

// Схема с типом IUser
const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  diskSpace: { type: Number, default: 1024 ** 3 * 10 },
  usedSpace: { type: Number, default: 0 },
  avatar: { type: String, default: null },
  files: [{ type: Schema.Types.ObjectId, ref: "File" }],
});

// Экспорт типизированной модели
export const User = model<IUser>("User", UserSchema);
