import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ProjectTech } from "./projectTechs.entity";
import { User } from "./user.entity";

@Entity("techs")
class Tech {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @ManyToOne((type) => User, (user) => user.techs, { onDelete: "CASCADE" })
  user: User;

  @OneToMany((type) => ProjectTech, (projects) => projects.techs)
  projects: ProjectTech[];

  @Column()
  userId: string;
}

export { Tech };
