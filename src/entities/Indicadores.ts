import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Objetivo } from "./Objetivo";

@Index("id_objetivo", ["idObjetivo"], {})
@Entity("indicadores", { schema: "redadelco" })
export class Indicadores {
  @Column("varchar", { primary: true, name: "id", length: 45 })
  id: string;

  @Column("longtext", { name: "descripcion" })
  descripcion: string;

  @Column("int", { name: "meta", nullable: true })
  meta: number | null;

  @Column("longtext", { name: "observacion", nullable: true })
  observacion: string | null;

  @Column("longtext", { name: "fuente_verificacion", nullable: true })
  fuenteVerificacion: string | null;

  @Column("longtext", { name: "archivo", nullable: true })
  archivo: string | null;

  @Column("int", { name: "id_objetivo", nullable: true })
  idObjetivo: number | null;

  @ManyToOne(
    () => Objetivo,
    objetivo => objetivo.indicadores,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_objetivo", referencedColumnName: "id" }])
  idObjetivo2: Objetivo;
}
