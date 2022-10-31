import { Exclude } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from "./contact.entity";
import { Project } from "./project.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 60, unique: true })
  email: string;

  @Column({ length: 120 })
  @Exclude()
  password: string;

  @Column()
  image: string;

  @Column()
  bio: string;

  @OneToOne((type) => Contact, {
    eager: true
  })@JoinColumn()
  contact: Contact

  @OneToMany((type) => Project, (projects) => projects.user, {
    eager: true
  })
  project: Project[]
}

export { User };