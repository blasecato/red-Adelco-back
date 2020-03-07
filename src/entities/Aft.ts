import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Organizacion } from "./Organizacion";

@Index("id_organizacion", ["idOrganizacion"], {})
@Entity("aft", { schema: "redadelco" })
export class Aft {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_organizacion", nullable: true })
  idOrganizacion: number | null;

  @Column("float", { name: "valor_aft", nullable: true, precision: 12 })
  valorAft: number | null;

  @Column("date", { name: "fecha_entrega", nullable: true })
  fechaEntrega: string | null;

  @ManyToOne(
    () => Organizacion,
    organizacion => organizacion.afts,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_organizacion", referencedColumnName: "id" }])
  idOrganizacion2: Organizacion;
}
