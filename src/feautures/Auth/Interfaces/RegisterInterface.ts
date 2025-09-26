import type { LoginForm } from "./LoginInterface";

export interface RegisterForm extends LoginForm {
  fullName: string;
  country: string;
  birthDate: string;
  repeatPassword?:string
}

