import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Herramienta } from "./Herramienta";

@Entity("tipo_herramienta", { schema: "redadelco" })
export class TipoHerramienta {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @Column("float", { name: "precio", nullable: true, precision: 12 })
  precio: number | null;

  @Column("longtext", { name: "marca", nullable: true })
  marca: string | null;

  @OneToMany(
    () => Herramienta,
    herramienta => herramienta.idTipoHerramienta2
  )
  herramientas: Herramienta[];
}
