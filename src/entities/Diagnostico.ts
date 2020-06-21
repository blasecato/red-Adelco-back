import { Column,  Entity,  Index,  JoinColumn,  ManyToOne,  PrimaryGeneratedColumn} from "typeorm";
import { Cultivo } from "./Cultivo";
import { Finca } from "./Finca";

@Index("id_cultivo", ["idCultivo"], {})
@Index("id_finca", ["idFinca"], {})
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

  @ManyToOne(
    () => Cultivo,
    cultivo => cultivo.diagnosticos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_cultivo", referencedColumnName: "id" }])
  idCultivo: Cultivo| null;

  @ManyToOne(
    () => Finca,
    finca => finca.diagnosticos,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_finca", referencedColumnName: "id" }])
  idFinca: Finca| null;
}
