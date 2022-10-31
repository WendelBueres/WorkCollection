import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("contacts")
class Contact {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  linkedin: string;

  @Column()
  github: string;

  @Column()
  phone: number;
}

export { Contact };