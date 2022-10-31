export interface IProjectRequest {
  name: string;
  category: string;
  image: string;
  link: string;
  technology: [string];
  userId: string;
}

export interface IProject extends IProjectRequest {
  id: string;
}
