import { Exclude } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
} from "typeorm";
import { Project } from "./project.entity";
import { Tech } from "./tech.entity";

@Entity("projectTechs")
class ProjectTech {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Tech, (techs) => techs.projects, {
    onDelete: "CASCADE",
    eager: true,
  })
  techs: Tech;

  @ManyToOne(() => Project, (project) => project.techs, { onDelete: "CASCADE" })
  projects: Project;

  @Column({ select: false })
  techsId: string;

  @Column({ select: false })
  projectsId: string;
}

export { ProjectTech };
