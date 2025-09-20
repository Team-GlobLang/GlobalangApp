import type { Categories, Status } from "./ColaboratorRequestInterface";

export interface ColaboratorRequestFilters {
  Status?: Status;
  Languages?: string;
  Category?: Categories;
}
