import { ITechRegister } from "../techs";

export interface IProjectRequest {
  name: string;
  category: string;
  image?: string | null;
  link: string;
  techsId: ITechRegister[];
  userId: string;
}

export interface IProject extends IProjectRequest {
  id: string;
}
