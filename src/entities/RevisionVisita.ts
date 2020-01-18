import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Cultivo } from "./Cultivo";

@Index("id_cultivo", ["idCultivo"], {})
@Entity("revision_visita", { schema: "redadelco" })
export class RevisionVisita {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre" })
  nombre: string;

  @Column("date", { name: "fecha_visita" })
  fechaVisita: string;

  @Column("time", { name: "hora_inicio" })
  horaInicio: string;

  @Column("time", { name: "hora_fin" })
  horaFin: string;

  @Column("longtext", { name: "situcacion_encontrada" })
  situcacionEncontrada: string;

  @Column("longtext", { name: "recomendaciones" })
  recomendaciones: string;

  @Column("longtext", { name: "observacion" })
  observacion: string;

  @Column("longtext", { name: "anexos" })
  anexos: string;

  @Column("longtext", { name: "imagen" })
  imagen: string;

  @Column("int", { name: "id_cultivo" })
  idCultivo: number;

  @ManyToOne(
    () => Cultivo,
    cultivo => cultivo.revisionVisitas,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_cultivo", referencedColumnName: "id" }])
  idCultivo2: Cultivo;
}
