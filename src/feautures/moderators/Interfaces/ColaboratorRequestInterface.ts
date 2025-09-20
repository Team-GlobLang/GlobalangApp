export enum Categories {
  MASTER = "MASTER",
  COLABORATOR = "COLABORATOR",
}

export enum Status {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}

export interface ColaboratorRequestForm {
  User_Id: string;
  Languages: string;
  Academic_Title: string;
  Category: Categories;
  Info_Extra: string;
  File: string;
}
