export type FormLoginType = {
  email: string;
  password: string;
};

export type FormRegisterType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface AuthenticationState {
  loading: boolean;
}
