import type { PaginationDto } from "src/feautures/shared/Interfaces/interfaces";
export interface StatsFilterDto extends PaginationDto {
  country?: string;
}
