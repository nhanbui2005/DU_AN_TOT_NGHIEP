// src/api/types.ts

// Giao diện phản hồi API chung
export interface ApiResponse<T = any> {
  success: boolean;
  code: number;       // HTTP-like or business code (ví dụ: 200, 400, 1001...)
  message: string;
  data?: T;
}

// Giao diện lỗi khi gọi API
export interface ApiError {
  status: number;     // HTTP status code
  message: string;
  errors?: string[];  // Danh sách lỗi chi tiết (thường dùng cho validation)
  rawError?: unknown; // Dữ liệu lỗi gốc để tiện debug
}

// Tham số cho truy vấn dạng "vô hạn" (infinite scroll)
export interface InfiniteScrollParams {
  lastId?: string;                     // ID của item cuối cùng đã load
  limit?: number;                     // Số item mỗi lần load
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Phản hồi kiểu infinite scroll (dùng kèm với InfiniteScrollParams)
export interface InfiniteScrollResponse<T> extends ApiResponse {
  data: {
    items: T[];
    hasMore: boolean;                 // Còn dữ liệu nữa không?
    lastId?: string;                  // ID cuối cùng trong lần trả về này
  };
}

// Tham số cho phân trang kiểu truyền thống
export interface PaginationParams {
  page?: number;                      // Trang hiện tại
  limit?: number;                     // Số phần tử mỗi trang
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Phản hồi có phân trang
export interface PaginatedResponse<T> extends ApiResponse {
  data: {
    items: T[];
    total: number;                    // Tổng số phần tử
    page: number;                     // Trang hiện tại
    limit: number;                    // Số phần tử mỗi trang
    totalPages: number;               // Tổng số trang
  };
}
