import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Productores } from "./Productores";
import { Municipio } from "./Municipio";
import { Organizacion } from "./Organizacion";

@Index("id_municipio", ["idMunicipio"], {})
@Index("id_organizacion", ["idOrganizacion"], {})
@Index("id_productor", ["idProductor"], {})
@Entity("aft", { schema: "tcsp_database" })
export class Aft {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_organizacion", nullable: true })
  idOrganizacion: number | null;

  @Column("float", { name: "valor_aft", nullable: true, precision: 12 })
  valorAft: number | null;

  @Column("date", { name: "fecha_entrega", nullable: true })
  fechaEntrega: string | null;

  @Column("bigint", { name: "cuenta", nullable: true })
  cuenta: string | null;

  @Column("varchar", { name: "tipo_cuenta", nullable: true, length: 100 })
  tipoCuenta: string | null;

  @Column("varchar", { name: "banco", nullable: true, length: 100 })
  banco: string | null;

  @Column("varchar", { name: "documento", nullable: true, length: 100 })
  documento: string | null;

  @Column("varchar", { name: "matricula", nullable: true, length: 100 })
  matricula: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @Column("varchar", { nullable: true, length: 2000 })
  avances: string | null;

  @Column("int", { name: "id_municipio", nullable: true })
  idMunicipio: number | null;

  @Column("int", { name: "DV", nullable: true })
  dv: number | null;

  @Column("bigint", { name: "nit", nullable: true })
  nit: string | null;

  @Column("int", { name: "id_productor", nullable: true })
  idProductor: number | null;

  @ManyToOne(
    () => Productores,
    productores => productores.afts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_productor", referencedColumnName: "dni" }])
  idProductor2: Productores;

  @ManyToOne(
    () => Municipio,
    municipio => municipio.afts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_municipio", referencedColumnName: "id" }])
  idMunicipio2: Municipio;

  @ManyToOne(
    () => Organizacion,
    organizacion => organizacion.afts,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_organizacion", referencedColumnName: "id" }])
  idOrganizacion2: Organizacion;
}
