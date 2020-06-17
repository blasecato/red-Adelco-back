import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Productores } from "./Productores";

@Entity("zona", { schema: "redadelco" })
export class Zona {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 45 })
  nombre: string | null;

  @OneToMany(
    () => Productores,
    Productores => Productores.idZona2
  )
  producers: Productores[];
}
