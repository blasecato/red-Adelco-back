import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cultivo } from "./Cultivo";
import { Finca } from "./Finca";

@Entity("diagnostico", { schema: "tcsp_database" })
export class Diagnostico {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @Column("date", { name: "fecha", nullable: true })
  fecha: string | null;

  @Column("time", { name: "hora_inicio", nullable: true })
  horaInicio: string | null;

  @Column("time", { name: "hora_fin", nullable: true })
  horaFin: string | null;

  @Column("longtext", { name: "imagen", nullable: true })
  imagen: string | null;

  @ManyToOne(() => Cultivo, cultivo => cultivo.diagnosticos, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "id_cultivo" }])
  cultivos: Cultivo | null;

  @ManyToOne(() => Finca, finca => finca.diagnosticos, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "id_finca" }])
  fincas: Finca | null;
}
