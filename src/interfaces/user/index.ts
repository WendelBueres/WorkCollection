import { IContact, IContactRequest } from "../contact";

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  image?: string;
  bio: string;
  contact?: IContactRequest;
}

export interface IUser extends IUserRequest {
  id: string;
  contact: IContact;
}

export interface IUserLogin {
  email: string;
  password: string;
}
