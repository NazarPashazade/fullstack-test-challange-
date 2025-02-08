export interface ILoginRequestDto {
  password: string;
  email: string;
}

export interface ILoginResponseDto {
  token: string;
}

export interface IRestoreRequestDto {
  email: string;
}

export interface IChangePasswordRequestDto {
  password: string;
  hash: string;
}

export interface IRegistrationRequestDto {
  first_name: string;
  last_name: string;
  password: string;
}

export interface IRegistrationResponseDto {
  token: string;
}

export interface IActivateRequestDto {
  hash: string;
}
