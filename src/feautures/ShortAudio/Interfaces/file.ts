export interface CreateShort {
  text: string;
  description: string;
  country: string;
  file: File;    
}

export type FavoriteCreated = {
  id: string
  shortId: string
};

export interface FilterShorts {
  country?: string;
  page?: number;
  limit?: number;
}

export interface ShortAudio {
  id: string
  text: string
  description: string
  country?: string
  fileUrl: string 
}