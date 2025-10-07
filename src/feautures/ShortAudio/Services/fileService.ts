import axios from 'axios';
import axiosInstance from '../../../Core/AxiosConfig';
import type { UploadFileResponse } from '../Interfaces/file';

export async function uploadAudio(
  audioFile: File,
  userId?: number
): Promise<UploadFileResponse> {
  const form = new FormData();
  form.append('file', audioFile);
  if (typeof userId === 'number') {
    form.append('userId', String(userId));
  }

  try {
    const { data } = await axiosInstance.post<UploadFileResponse>(
      '/files/upload',
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || 'Upload failed');
    }
    throw new Error('Unknown upload error');
  }
}