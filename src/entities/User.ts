import { Column, Entity, BaseEntity, OneToOne, JoinColumn, PrimaryGeneratedColumn, Index } from "typeorm";
import { Productores } from "./Productores";

@Index('id', ['id'], { unique: true })
@Entity("user", { schema: "redadelco" })
export class User extends BaseEntity {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column("varchar", { name: "email", length: 145 })
  email: string;

  @Column("varchar", { name: "password", length: 250 })
  password: string;

  @Column("varchar", { name: "rol", length: 145 })
  rol: string;

  @Column("varchar", { nullable: false, length: '50', default: 'active' })
  state: string;

  @OneToOne(type => Productores, Productores => Productores.user,
    { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'fk_producer', referencedColumnName: "dni" })
  dniProducer: Productores;
}
