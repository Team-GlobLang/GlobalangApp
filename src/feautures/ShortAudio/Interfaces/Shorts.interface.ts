export interface AvailableShortsInterface {
  id: string;
  text: string;
  description?: string;
  createBy: string;
  fileUrl: string;
  country?: string;
}

export interface MyShortsInterface extends AvailableShortsInterface {
  approved: boolean | null;
  reviewComment: string;
}

export interface ShortsListResponse {
  data: MyShortsInterface
}