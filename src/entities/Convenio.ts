import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Infraestructura } from "./Infraestructura";
import { EnteConvenio } from "./EnteConvenio";

@Index("id_ente_convenio", ["idEnteConvenio"], {})
@Index("id_infraestructura", ["idInfraestructura"], {})
@Entity("convenio", { schema: "redadelco" })
export class Convenio {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre" })
  nombre: string;

  @Column("int", { name: "id_infraestructura", nullable: true })
  idInfraestructura: number | null;

  @Column("int", { name: "id_ente_convenio", nullable: true })
  idEnteConvenio: number | null;

  @ManyToOne(
    () => Infraestructura,
    infraestructura => infraestructura.convenios,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_infraestructura", referencedColumnName: "id" }])
  idInfraestructura2: Infraestructura;

  @ManyToOne(
    () => EnteConvenio,
    enteConvenio => enteConvenio.convenios,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_ente_convenio", referencedColumnName: "id" }])
  idEnteConvenio2: EnteConvenio;
}
