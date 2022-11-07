export interface IProjectRequest {
  name: string;
  category: string;
  image?: string | null;
  link: string;
  technology: string;
}

export interface IProject extends IProjectRequest {
  id: string;
}
