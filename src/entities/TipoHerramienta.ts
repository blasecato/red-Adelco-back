import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Herramienta } from "./Herramienta";

@Entity("tipo_herramienta", { schema: "redadelco" })
export class TipoHerramienta {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre" })
  nombre: string;

  @Column("float", { name: "precio", precision: 12 })
  precio: number;

  @Column("longtext", { name: "marca" })
  marca: string;

  @OneToMany(
    () => Herramienta,
    herramienta => herramienta.idTipoHerramienta2
  )
  herramientas: Herramienta[];
}
