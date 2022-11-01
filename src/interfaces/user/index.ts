export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  image?: string;
  bio: string;
}

export interface IUser extends IUserRequest {
  id: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
