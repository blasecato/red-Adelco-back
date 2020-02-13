import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Productores } from "./Productores";
import { Municipio } from "./Municipio";
import { Vereda } from "./Vereda";
import { Acepta } from "./Acepta";
import { LineaProductiva } from "./LineaProductiva";
import { RevisionVisita } from "./RevisionVisita";

@Index("id_acepta", ["idAcepta"], {})
@Index("id_linea_productiva", ["idLineaProductiva"], {})
@Index("id_municipio", ["idMunicipio"], {})
@Index("id_productor", ["codigoProductor"], {})
@Index("id_productores", ["dniProductor"], {})
@Index("id_vereda", ["idVereda"], {})
@Entity("cultivo", { schema: "redadelco" })
export class Cultivo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("float", { name: "hectareas", nullable: true, precision: 12 })
  hectareas: number | null;

  @Column("date", { name: "fecha_inicio", nullable: true })
  fechaInicio: string | null;

  @Column("int", { name: "id_linea_productiva", nullable: true })
  idLineaProductiva: number | null;

  @Column("varchar", { name: "codigo_productor", nullable: true, length: 45 })
  codigoProductor: string | null;

  @Column("int", { name: "id_acepta", nullable: true })
  idAcepta: number | null;

  @Column("int", { name: "dni_productor", nullable: true })
  dniProductor: number | null;

  @Column("int", { name: "id_municipio", nullable: true })
  idMunicipio: number | null;

  @Column("int", { name: "id_vereda", nullable: true })
  idVereda: number | null;

  @ManyToOne(
    () => Productores,
    productores => productores.cultivos,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "dni_productor", referencedColumnName: "dni" }])
  dniProductor2: Productores;

  @ManyToOne(
    () => Municipio,
    municipio => municipio.cultivos,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_municipio", referencedColumnName: "id" }])
  idMunicipio2: Municipio;

  @ManyToOne(
    () => Vereda,
    vereda => vereda.cultivos,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_vereda", referencedColumnName: "id" }])
  idVereda2: Vereda;

  @ManyToOne(
    () => Acepta,
    acepta => acepta.cultivos,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_acepta", referencedColumnName: "id" }])
  idAcepta2: Acepta;

  @ManyToOne(
    () => Productores,
    productores => productores.cultivos2,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "codigo_productor", referencedColumnName: "id" }])
  codigoProductor2: Productores;

  @ManyToOne(
    () => LineaProductiva,
    lineaProductiva => lineaProductiva.cultivos,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_linea_productiva", referencedColumnName: "id" }])
  idLineaProductiva2: LineaProductiva;

  @OneToMany(
    () => RevisionVisita,
    revisionVisita => revisionVisita.idCultivo2
  )
  revisionVisitas: RevisionVisita[];
}
