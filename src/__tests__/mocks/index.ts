import { IContactRequest } from "../../interfaces/contact";
import { IUserLogin, IUserRequest } from "../../interfaces/user";
import { createdUserIdTest } from "../integration/users";

export const mockedUser: IUserRequest = {
  name: "Jonas",
  email: "jonas@email.com",
  image:
    "https://media.istockphoto.com/vectors/green-alien-climbs-out-from-the-hole-of-space-with-stars-in-flat-vector-id1173828830?k=20&m=1173828830&s=612x612&w=0&h=bXd7sIQWbx7HJoDbvSb8BELPHZICLzgwioOaVmwIeJE=",
  password: "123456789!",
  bio: "Olá, eu sou um dev!",
};

export const mockedUserErrorName: any = {
  email: "marcia@email.com",
  bio: "Olá, sou uma dev!",
  password: "123456789!",
};

export const mockedUserPatch: any = {
  email: "james@mail.com",
};

export const mockedUserPatchId: any = {
  id: "48as15das5da12asd",
};

export const mockedUserErrorPassword: any = {
  name: "Maria",
  email: "marcia@email.com",
  bio: "Olá, sou uma dev!",
};

export const mockedUserErrorBio: any = {
  name: "Maria",
  email: "marcia@email.com",
  password: "123456789!",
};

export const mockedUserErrorEmail: any = {
  name: "Maria",
  bio: "Olá, sou uma dev!",
  password: "123456789!",
};

export const mockedUserLogin: IUserLogin = {
  email: "jonas@email.com",
  password: "123456789!",
};

export const mockedLoginErrorPassword: IUserLogin = {
  email: "jonas@email.com",
  password: "123456",
};

export const mockedLoginErrorFieldPassword: any = {
  email: "jonas@email.com",
};

export const mockedLoginErrorFieldEmail: any = {
  password: "123456",
};

export const mockedContact: IContactRequest = {
  userId: createdUserIdTest,
  github: "github.com/linkuser",
  linkedin: "linkedin.com/linkuser",
  phone: "+55 96 99999-9999",
};

export const mockedContactGithub: any = {
  github: "github.com/newlinkuser",
};

export const mockedContactLinkedin: any = {
  linkedin: "linkedin.com/newlinkuser",
};

export const mockedContactPhone: any = {
  phone: "+55 96 98200-0000",
};
