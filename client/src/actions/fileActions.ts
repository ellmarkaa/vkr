import axios from 'axios';
import { AppDispatch } from '../app/store';
import {IFile, IUploadFile} from "../app/types";
import {API_URL} from "../app/config";
import {addUploadFile, changeUploadFile, showUploader} from "../slices/uploaderSlice";
import {addFile, deleteFileAction, setFiles} from "../slices/fileSlice";
import {hideLoader, showLoader} from "../slices/appSlice";

export const getFiles = (dirId: string | null, sort: string | null) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(showLoader());
            let url = `${API_URL}api/files`;
            if (dirId) {
                url = `${API_URL}api/files?parent=${dirId}`;
            }
            if (sort) {
                url = `${API_URL}api/files?sort=${sort}`;
            }
            if (dirId && sort) {
                url = `${API_URL}api/files?parent=${dirId}&sort=${sort}`;
            }

            const response = await axios.get<IFile[]>(url, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            // @ts-ignore
            dispatch(setFiles(response.data));
        } catch (e: any) {
            alert(e?.response?.data?.message || 'Ошибка при получении файлов');
        } finally {
            dispatch(hideLoader());
        }
    };
};

export const createDir = (dirId: string | null, name: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.post<IFile>(`${API_URL}api/files`, {
                name,
                parent: dirId,
                type: 'dir',
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            // @ts-ignore
            dispatch(addFile(response.data));
        } catch (e: any) {
            alert(e?.response?.data?.message || 'Ошибка при создании папки');
        }
    };
};

export const uploadFile = (file: File, dirId: string | null) => {
    return async (dispatch: AppDispatch) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            if (dirId) {
                formData.append('parent', dirId);
            }

            const uploadFile: IUploadFile = { name: file.name, progress: 0, id: Date.now() };
            dispatch(showUploader());
            // @ts-ignore
            dispatch(addUploadFile(uploadFile));

            const response = await axios.post<IFile>(`${API_URL}api/files/upload`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable
                        ? progressEvent.total
                        // @ts-ignore
                        : progressEvent.target?.getResponseHeader('content-length') || progressEvent.target?.getResponseHeader('x-decompressed-content-length');

                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength);
                        dispatch(changeUploadFile(uploadFile));
                    }
                },
            });
            // @ts-ignore
            dispatch(addFile(response.data));
        } catch (e: any) {
            alert(e?.response?.data?.message || 'Ошибка при загрузке файла');
        }
    };
};

export const downloadFile = async (file: IFile) => {
    try {
        // @ts-ignore
        const response = await fetch(`${API_URL}api/files/download?id=${file._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.status === 200) {
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } else {
            alert('Ошибка при скачивании файла');
        }
    } catch (e: any) {
        alert(e?.message || 'Ошибка при скачивании файла');
    }
};

export const deleteFile = (file: IFile) => {
    return async (dispatch: AppDispatch) => {
        try {
            // @ts-ignore
            const response = await axios.delete<{ message: string }>(`${API_URL}api/files?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            // @ts-ignore
            dispatch(deleteFileAction(file._id));
            alert(response.data.message);
        } catch (e: any) {
            alert(e?.response?.data?.message || 'Ошибка при удалении файла');
        }
    };
};

export const searchFiles = (search: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(showLoader());
            const response = await axios.get<IFile[]>(`${API_URL}api/files/search?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            // @ts-ignore
            dispatch(setFiles(response.data));
        } catch (e: any) {
            alert(e?.response?.data?.message || 'Ошибка при поиске файлов');
        } finally {
            dispatch(hideLoader());
        }
    };
};