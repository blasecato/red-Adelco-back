import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Productores } from "./Productores";

@Entity("cargo_org", { schema: "redadelco" })
export class CargoOrg {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 45 })
  nombre: string | null;

  @OneToMany(
    () => Productores,
    productores => productores.idCargoOrg
  )
  productores: Productores[];
}
