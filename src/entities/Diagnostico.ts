import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Finca } from "./Finca";

@Index("id_finca", ["idFinca"], {})
@Entity("diagnostico", { schema: "redadelco" })
export class Diagnostico {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @Column("date", { name: "fecha" })
  fecha: string;

  @Column("time", { name: "hora_inicio" })
  horaInicio: string;

  @Column("time", { name: "hora_fin" })
  horaFin: string;

  @Column("longtext", { name: "imagen" })
  imagen: string;

  @Column("int", { name: "id_finca" })
  idFinca: number;

  @ManyToOne(
    () => Finca,
    finca => finca.diagnosticos,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_finca", referencedColumnName: "id" }])
  idFinca2: Finca;
}
