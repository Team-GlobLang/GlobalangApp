import axiosInstance from "@core/AxiosConfig";
import axios from "axios";
import type { FavoriteCreated, FilterShorts } from "../Interfaces/file";

const createShort = async (data:any) => {
  try {
    const formData = new FormData();
    data.files.forEach((file:File) => formData.append("file", file));
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "files" && value != null) {
        formData.append(key, value.toString());
      }
    });
     await axiosInstance.post( "shorts", formData
    );
     return

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw new Error(error.response?.data.message);
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error desconocido");
    }
  }
};

const GetAllAudios = async ( Data: FilterShorts )=> {
  try {
    const response = await axiosInstance.get('shorts', {
      params: Data, //los filtros son dinamicos no siempre quemados
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch audios');
    } else {
      console.error('Error desconocido: ', error);
      throw new Error('Error desconocido');
    }
  }
};

const addShortsToFavorites = async (ids: string[]): Promise<FavoriteCreated[] | any> => {
  try {
    const { data } = await axiosInstance.post('/shorts/favorites', ids, {
      headers: { 'Content-Type': 'application/json' },
    })
    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Failed to add favorites')
    } else {
      console.error('Unknown error: ', error)
      throw new Error('Unknown error')
    }
  }
}

export { createShort, GetAllAudios, addShortsToFavorites };