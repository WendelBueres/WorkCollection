import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ProjectTech } from "./projectTechs.entity";
import { User } from "./user.entity";

@Entity("projects")
class Project {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column({ type: "text", nullable: true, default: null })
  image: string | null;

  @Column()
  link: string;

  @ManyToOne((type) => User, (users) => users.project)
  user: User;

  @OneToMany((type) => ProjectTech, (projectsTech) => projectsTech.projects)
  projectTechs: ProjectTech;

  @Column()
  userId: string;

  @Column()
  technology: string;
}

export { Project };
