import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Diagnostico } from "./Diagnostico";
import { Acepta } from "./Acepta";
import { LineaProductiva } from "./LineaProductiva";
import { RevisionVisita } from "./RevisionVisita";
import { Municipio } from "./Municipio";
import { Vereda } from "./Vereda";
import { Productores } from "./Productores";

@Index("id_acepta", ["idAcepta"], {})
@Index("id_linea_productiva", ["idLineaProductiva"], {})
@Index("id_municipio", ["idMunicipio"], {})
@Index("id_productor", ["codigoProductor"], {})
@Index("id_productores", ["dniProductor"], {})
@Index("id_vereda", ["idVereda"], {})
@Entity("cultivo", { schema: "tcsp_database" })
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

  @Column("varchar", { name: "posicion_acepta", nullable: true, length: 150 })
  posicionAcepta: string | null;

  @OneToMany(
    () => Diagnostico,
    diagnostico => diagnostico.idCultivo2
  )
  diagnosticos: Diagnostico[];

  @ManyToOne(
    () => Acepta,
    acepta => acepta.cultivos,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_acepta", referencedColumnName: "id" }])
  idAcepta2: Acepta | null;

  @ManyToOne(
    () => LineaProductiva,
    lineaProductiva => lineaProductiva.cultivos,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_linea_productiva", referencedColumnName: "id" }])
  idLineaProductiva2: LineaProductiva;

  @OneToMany(
    () => RevisionVisita,
    revisionVisita => revisionVisita.idCultivo2
  )
  revisionVisitas: RevisionVisita[];

  @ManyToOne(
    () => Municipio,
    municipio => municipio.cultivos,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_municipio", referencedColumnName: "id" }])
  idMunicipio2: Municipio;

  @ManyToOne(
    () => Vereda,
    vereda => vereda.cultivos,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_vereda", referencedColumnName: "id" }])
  idVereda2: Vereda | null;

  @ManyToOne(
    () => Productores,
    productores => productores.cultivos,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "codigo_productor", referencedColumnName: "id" }])
  codigoProductor2: Productores;

  @ManyToOne(
    () => Productores,
    productores => productores.cultivos2,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "dni_productor", referencedColumnName: "dni" }])
  dniProductor2: Productores;
}
