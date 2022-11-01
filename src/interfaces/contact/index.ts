export interface IContactRequest {
  linkedin?: string;
  github?: string;
  phone?: string;
  userId: string;
}

export interface IContact extends IContactRequest {
  id: string;
}
