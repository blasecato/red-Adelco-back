import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { TipoHerramienta } from "./TipoHerramienta";
import { KitHerramienta } from "./KitHerramienta";

@Index("id_tipo_herramienta", ["idTipoHerramienta"], {})
@Entity("herramienta", { schema: "redadelco" })
export class Herramienta {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "descripcion", length: 100 })
  descripcion: string;

  @Column("int", { name: "id_tipo_herramienta" })
  idTipoHerramienta: number;

  @ManyToOne(
    () => TipoHerramienta,
    tipoHerramienta => tipoHerramienta.herramientas,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_tipo_herramienta", referencedColumnName: "id" }])
  idTipoHerramienta2: TipoHerramienta;

  @OneToMany(
    () => KitHerramienta,
    kitHerramienta => kitHerramienta.idHerramienta2
  )
  kitHerramientas: KitHerramienta[];
}
