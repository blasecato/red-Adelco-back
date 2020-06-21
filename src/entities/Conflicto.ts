import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Productores } from "./Productores";

@Entity("conflicto", { schema: "redadelco" })
export class Conflicto {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 45 })
  nombre: string | null;

  @OneToMany(
    () => Productores,
    productores => productores.idConflicto
  )
  productores: Productores[];
}
