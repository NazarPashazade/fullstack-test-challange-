export interface IBaseResponse {
  message: string;
}

export interface IPaginatedResponse<T> {
  rows: T[];
  count: number;
  clear?: boolean;
}

export interface IErrorResponse {
  code?: number;
  message?: string;
  isCustomMessage?: boolean;
  meta?: Record<string, string>;
  customMessageText?: string;
}
