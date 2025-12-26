export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[] | string>;
  url?: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}


