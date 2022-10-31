import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("projects")
class Project {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  image: string;

  @Column()
  link: string;

  @Column()
  technology: string;

  @ManyToOne((type) => User, (users) => users.project)
  @JoinColumn()
  user: User
}

export { Project };