import type { PaginationDto } from "src/feautures/shared/Interfaces/interfaces";

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

export interface FilterShorts extends PaginationDto {
  country?: string;
  approved?: boolean | null
} 
export interface FilterMyShorts extends PaginationDto {
  text?: string;
  approved?: boolean | null
} 

export interface ShortAudio {
  id: string
  text: string
  description: string
  country?: string
  fileUrl: string 
}