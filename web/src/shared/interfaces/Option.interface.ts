export interface IOption<T = string | number | null, M = unknown> {
  value: T;
  label: string | React.ReactNode;
  object?: M;
}
