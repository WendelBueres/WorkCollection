import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Contact } from "./contact.entity";
import { Project } from "./project.entity";
import { Tech } from "./tech.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 60, unique: true })
  email: string;

  @Column({ length: 120 })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  bio: string;

  @OneToOne((type) => Contact, (user) => User, {
    eager: true,
  })
  @JoinColumn()
  contact: Contact;

  @OneToMany((type) => Project, (projects) => projects.user, {
    eager: true,
  })
  project: Project;

  @OneToMany((type) => Tech, (techs) => techs.user, {
    eager: true,
  })
  techs: Tech;
}

export { User };
