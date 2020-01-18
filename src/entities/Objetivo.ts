import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Indicadores } from "./Indicadores";

@Entity("objetivo", { schema: "redadelco" })
export class Objetivo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @Column("longtext", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @OneToMany(
    () => Indicadores,
    indicadores => indicadores.idObjetivo2
  )
  indicadores: Indicadores[];
}
