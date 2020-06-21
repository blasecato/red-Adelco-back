import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Productores } from "./Productores";

@Entity("discapacidad", { schema: "redadelco" })
export class Discapacidad {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 45 })
  nombre: string | null;

  @OneToMany(
    () => Productores,
    productores => productores.idDiscapacitado
  )
  productores: Productores[];
}
