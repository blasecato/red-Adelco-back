import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Productores } from "./Productores";

@Entity("genero", { schema: "redadelco" })
export class Genero {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @OneToMany(
    () => Productores,
    productores => productores.idGenero2
  )
  productores: Productores[];
}
