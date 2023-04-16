export interface LoginResponse {
  email: string;
  role: string;
  isActivated: boolean;
  accessToken: string;
};

export interface RegistrationResponse {
  accessToken: string;
};