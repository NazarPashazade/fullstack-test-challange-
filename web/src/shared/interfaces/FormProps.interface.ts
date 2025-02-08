export interface FormProps<T> {
  loading?: boolean;
  submitHandler?: (data: T) => void;
}
