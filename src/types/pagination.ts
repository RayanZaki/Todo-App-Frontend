export interface PaginationResponse<T> {
  data: T[]; // Data of the paginated response
  next_page: number; // Current page number
  previous_page: number; // Number of items per page
}

export interface PaginationRequest {
  startIndex: number; // Current page number
  ppageSize: number; // Number of items per page
}