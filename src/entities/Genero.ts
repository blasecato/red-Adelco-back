import { Column, Entity, OneToMany, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Productores } from "./Productores";

@Entity("genero", { schema: "redadelco" })
export class Genero extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @OneToMany(() => Productores, productores => productores.idGenero2, { eager: true })
  productores: Productores[];
}
