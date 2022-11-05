import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { ProjectTech } from "./projectTechs.entity";
import { User } from "./user.entity";

@Entity("techs")
class Tech {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @ManyToOne((type) => User, (users) => users.techs)
  user: User;

  @OneToMany((types) => ProjectTech, (projectTechs) => projectTechs.techs)
  projectTechs: ProjectTech;
}

export { Tech }