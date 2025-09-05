import type { LoginForm } from "./LoginInterface";

export interface RegisterForm extends LoginForm {
  repeatPassword: string;
  fullName: string;
  country: string;
  birthDate: string;
}
