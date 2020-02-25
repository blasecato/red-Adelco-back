import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Municipio } from "./Municipio";

@Index("id_municipio", ["idMunicipio"], {})
@Entity("grupo_gacc", { schema: "redadelco" })
export class GrupoGacc {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @Column("int", { name: "id_municipio", nullable: true })
  idMunicipio: number | null;

  @Column("int", { name: "cantidad_inicial", nullable: true })
  cantidadInicial: number | null;

  @Column("int", { name: "cantidad_final", nullable: true })
  cantidadFinal: number | null;

  @Column("date", { name: "fecha_inicio", nullable: true })
  fechaInicio: string | null;

  @Column("date", { name: "fecha_final", nullable: true })
  fechaFinal: string | null;

  @Column("int", { name: "cantidad_seciones", nullable: true })
  cantidadSeciones: number | null;

  @Column("float", { name: "valor_accion", nullable: true, precision: 12 })
  valorAccion: number | null;

  @Column("float", { name: "valor_fondo", nullable: true, precision: 12 })
  valorFondo: number | null;

  @Column("int", { name: "valor_interes", nullable: true })
  valorInteres: number | null;

  @Column("float", { name: "total_ahorrado", nullable: true, precision: 12 })
  totalAhorrado: number | null;

  @Column("float", { name: "total_fondo", nullable: true, precision: 12 })
  totalFondo: number | null;

  @Column("int", { name: "personas_prestamo", nullable: true })
  personasPrestamo: number | null;

  @Column("longtext", { name: "dificultades", nullable: true })
  dificultades: string | null;

  @Column("longtext", { name: "aprendizaje", nullable: true })
  aprendizaje: string | null;

  @ManyToOne(
    () => Municipio,
    municipio => municipio.grupoGaccs,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_municipio", referencedColumnName: "id" }])
  idMunicipio2: Municipio;
}
