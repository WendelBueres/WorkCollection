import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity("contacts")
class Contact {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "text", nullable: true })
  linkedin: string | null;

  @Column({ type: "text", nullable: true })
  github: string | null;

  @Column({ type: "text", nullable: true })
  phone: string | null;

  @OneToOne((type) => User, (contact) => Contact)
  user: User;
}

export { Contact };
