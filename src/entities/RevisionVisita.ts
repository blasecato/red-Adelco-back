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

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @Column("date", { name: "fecha_visita", nullable: true })
  fechaVisita: string | null;

  @Column("time", { name: "hora_inicio", nullable: true })
  horaInicio: string | null;

  @Column("time", { name: "hora_fin", nullable: true })
  horaFin: string | null;

  @Column("longtext", { name: "situcacion_encontrada", nullable: true })
  situcacionEncontrada: string | null;

  @Column("longtext", { name: "recomendaciones", nullable: true })
  recomendaciones: string | null;

  @Column("longtext", { name: "observacion", nullable: true })
  observacion: string | null;

  @Column("longtext", { name: "anexos", nullable: true })
  anexos: string | null;

  @Column("longtext", { name: "imagen", nullable: true })
  imagen: string | null;

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
