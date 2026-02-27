export interface DataItem {
  id?: number;
  name: string;
  description?: string;
  createdAt?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
