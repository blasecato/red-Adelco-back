import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Organizacion } from "./Organizacion";

@Entity("ico", { schema: "redadelco" })
export class Ico {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 255 })
  nombre: string | null;

  @OneToMany(
    () => Organizacion,
    organizacion => organizacion.idIco2
  )
  organizacions: Organizacion[];
}
