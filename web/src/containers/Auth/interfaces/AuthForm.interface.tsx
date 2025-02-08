export interface ILoginShape {
  password: string;
  email: string;
}

export interface IRestoreShape {
  email: string;
}

export interface IChangePasswordShape {
  password: string;
  confirm_password: string;
}

export interface IRegistrationShape {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirm: string;
}

export interface IChangePasswordPayloadShape {
  password: string;
  hash: string;
}

export interface IActivatePayloadShape {
  hash: string;
}

export interface IRegistrationPayloadShape {
  first_name: string;
  last_name: string;
  password: string;
}
