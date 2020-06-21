import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Productores } from "./Productores";

@Entity("grupo_etnico", { schema: "redadelco" })
export class GrupoEtnico {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @OneToMany(
    () => Productores,
    productores => productores.idEtnia
  )
  productores: Productores[];
}
