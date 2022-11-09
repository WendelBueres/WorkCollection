import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
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

  @ManyToOne((type) => User, (users) => users.project, { onDelete: "CASCADE" })
  user: User;

  @OneToMany((type) => ProjectTech, (projectsTech) => projectsTech.projects, {
    eager: true,
    cascade: true,
  })
  techs: ProjectTech[];

  @Column()
  @Exclude()
  userId: string;
}

export { Project };
