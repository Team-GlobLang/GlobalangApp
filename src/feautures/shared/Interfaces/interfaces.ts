export class PaginationDto {
  page?: number;

  limit?: number;
}

export class ShortFiltersDto extends PaginationDto {
  country?: string;

  approved: boolean = true;
}
