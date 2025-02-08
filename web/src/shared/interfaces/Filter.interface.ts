export enum ORDER_TYPE {
  ASC = "ASC",
  DESC = "DESC",
  NONE = "",
}

export interface IFilter {
  page: number;
  limit: number;
  search: string;

  sort_by?: string;
  sort_order?: ORDER_TYPE;
}
