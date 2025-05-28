export interface IUser {
    email: string;
    password: string;
    diskSpace: number;
    usedSpace: number;
    avatar: string | null;
    files: any[]
}

export interface IFile {
    name: string;
    type: string;
    accessLink?: string;
    size: number;
    path: string;
    date: Date;
    user: string;
    parent?: string;
    childs: string;
}

export interface IUploadFile {
    id: number;
    name: string;
    progress: number;
}