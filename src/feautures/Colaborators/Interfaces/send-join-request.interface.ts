export interface SendRequestData {
  fullName: string;
  email: string;
  languages: string;
  phoneNumber: string;
  aboutColaborator?: string;
  files: File[];
  category: string
}