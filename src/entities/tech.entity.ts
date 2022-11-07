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

  @ManyToOne((type) => User, (tech) => Tech)
  user: User;

  @OneToMany((types) => ProjectTech, (techs) => Tech)
  projectTechs: ProjectTech;
}

export { Tech };
