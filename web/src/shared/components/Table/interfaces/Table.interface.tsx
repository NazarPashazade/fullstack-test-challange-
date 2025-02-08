import React from "react";

import { ORDER_TYPE } from "@shared/interfaces";

export interface ITableProperty<T> {
  key: keyof T;
  title: string;
  sortBy?: string;
  get?: (item: T) => React.ReactNode | string;
  cellClick?: (item: T) => void;
}

export interface ITableSort {
  sortBy?: string;
  sortOrder?: ORDER_TYPE;
  onChangeSorting?: (sortBy: string | undefined, sortOrder: ORDER_TYPE | undefined) => void;
}
