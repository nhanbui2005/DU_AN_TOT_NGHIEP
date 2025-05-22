export interface ApiResponse<T = any> {
  data: T;
  message: string;
  status: number;
}

export interface ApiError {
  message: string;
  code: number;
  details?: Record<string, any>;
}

export interface InfiniteScrollParams {
  lastId?: string;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface InfiniteScrollResponse<T> extends ApiResponse {
  data: {
    items: T[];
    hasMore: boolean;
    lastId?: string;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> extends ApiResponse {
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
} 