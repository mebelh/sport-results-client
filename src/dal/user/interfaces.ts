export interface IUserInfo {
  firstName?: string;
  lastName?: string;
  login: string;
}

export interface ILoginResponse {
  user: IUserInfo;
  token: string;
}

export interface IUserResponse {
  user: IUserInfo;
}
