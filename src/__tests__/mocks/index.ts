import { IContactRequest } from "../../interfaces/contact";
import { IProjectRequest } from "../../interfaces/projects";
import { ITechRegisterRegister } from "../../interfaces/techs";
import { IUserLogin, IUserRequest } from "../../interfaces/user";

export const mockedUser: IUserRequest = {
  name: "Jonas",
  email: "jonas@email.com",
  image:
    "https://media.istockphoto.com/vectors/green-alien-climbs-out-from-the-hole-of-space-with-stars-in-flat-vector-id1173828830?k=20&m=1173828830&s=612x612&w=0&h=bXd7sIQWbx7HJoDbvSb8BELPHZICLzgwioOaVmwIeJE=",
  password: "123456789!",
  bio: "Olá, eu sou um dev!",
};

export const mockedUser2: IUserRequest = {
  name: "Pedro",
  email: "pedro@email.com",
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

export const mockedUserPatch: any = {
  email: "james@mail.com",
};

export const mockedUserPatchId: any = {
  id: "48as15das5da12asd",
};

export const mockedUserLogin: IUserLogin = {
  email: "jonas@email.com",
  password: "123456789!",
};

export const mockedUserLogin2: IUserLogin = {
  email: "pedro@email.com",
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

export const mockedProject: IProjectRequest = {
  name: "Floricultura Online",
  category: "Front-End",
  image: "imageproject.com/img.jpeg",
  link: "floresonline.com",
  techsId: [] as ITechRegisterRegister[],
  userId: "",
};

export const mockedProjectPatchName: any = {
  name: "Flores Online",
};

export const mockedTech: any = {
  name: "React",
};

export const mockedTech2: any = {
  name: "TypeScript",
};

export const mockedTech3: any = {
  name: "JavaScript",
};

export const mockedProjectPatchId: any = {
  id: "48d4dd5d5e6f",
};

export const mockedContactPatchId: any = {
  id: "48d4dd5d5e6f",
};

export const mockedTechPost: any = {
  name: "javaScript",
};

export const MockedPatchTestTech: any = {
  name: "TypeScript",
};

export const MockedPatchTestTechID: any = {
  id: "12393h47f4",
};
