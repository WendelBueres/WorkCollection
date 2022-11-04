import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { Project } from "./project.entity";
import { Tech } from "./tech.entity";

@Entity("projectTechs")
class ProjectTech {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Tech)
  techs: Tech;

  @ManyToOne(() => Project)
  projects: Project;   
}

export { ProjectTech }