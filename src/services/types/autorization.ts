export interface IUserData {
  email: string;
  name?: string;
  password?: string
}

export interface IPasswordRes {
  message: string;
  success: boolean;
}

export interface ILoginRes {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: IUserData;
}

export interface ILogoutRes {
  token: string;
}

export interface IRefreshData {
  success: boolean;
  refreshToken: string;
  accessToken: string;
}

export interface IGetUserDataRes {
  success: boolean;
  user: IUserData;
}
