import { User } from "../../entities/user.entity";

export interface IContactRequest {
  linkedin?: string | null;
  github?: string | null;
  phone?: string | null;
}

export interface IContact extends IContactRequest {
  id: string;
}
