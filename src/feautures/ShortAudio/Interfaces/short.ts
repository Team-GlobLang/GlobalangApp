export interface CreateShortDto {
  text: string;
  description: string;
  country: string;
  file: File;    
}

export interface ShortResponse {
  id: string;
  text: string;
  description: string;
  country: string;
  fileUrl: string;
  userId: string;
  createBy: string;
  approved: boolean;
  createdAt: string;
}

export interface AudioItem {
  id: string | number
  src: string
  duration: number
  title: string
  description?: string
  favorite?: boolean
}