import { ITechRegisterRegister } from "../techs";

export interface IProjectRequest {
  name: string;
  category: string;
  image?: string | null;
  link: string;
  techsId: ITechRegisterRegister[];
  userId: string;
}

export interface IProject extends IProjectRequest {
  id: string;
}
