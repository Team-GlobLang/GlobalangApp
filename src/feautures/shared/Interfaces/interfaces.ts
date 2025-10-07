export class PaginationDto {
  page?: number | unknown;

  limit?: number;
}

export class ShortFiltersDto extends PaginationDto {
  country?: string;

  approved: boolean = true;
}

export interface PaginatedResponse<T> {
    data: T[]
    meta: {
        page: number
        limit: number
        total: number
        totalPages: number
        hasNextPage: boolean
        hasPrevPage: boolean
    }
}