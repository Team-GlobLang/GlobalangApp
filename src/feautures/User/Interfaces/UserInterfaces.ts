export interface updateUserInfo {
  fullName: string;
  country: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  repeatPassword: string;
}