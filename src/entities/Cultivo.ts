import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { LineaProductiva } from "./LineaProductiva";
import { Productores } from "./Productores";
import { Acepta } from "./Acepta";
import { RevisionVisita } from "./RevisionVisita";

@Index("id_acepta", ["idAcepta"], {})
@Index("id_linea_productiva", ["idLineaProductiva"], {})
@Index("id_productor", ["idProductor"], {})
@Entity("cultivo", { schema: "redadelco" })
export class Cultivo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @Column("float", { name: "hectareas", nullable: true, precision: 12 })
  hectareas: number | null;

  @Column("date", { name: "fecha_inicio", nullable: true })
  fechaInicio: string | null;

  @Column("int", { name: "id_linea_productiva", nullable: true })
  idLineaProductiva: number | null;

  @Column("varchar", { name: "id_productor", nullable: true, length: 45 })
  idProductor: string | null;

  @Column("int", { name: "id_acepta", nullable: true })
  idAcepta: number | null;

  @ManyToOne(
    () => LineaProductiva,
    lineaProductiva => lineaProductiva.cultivos,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_linea_productiva", referencedColumnName: "id" }])
  idLineaProductiva2: LineaProductiva;

  @ManyToOne(
    () => Productores,
    productores => productores.cultivos,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_productor", referencedColumnName: "id" }])
  idProductor2: Productores;

  @ManyToOne(
    () => Acepta,
    acepta => acepta.cultivos,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_acepta", referencedColumnName: "id" }])
  idAcepta2: Acepta;

  @OneToMany(
    () => RevisionVisita,
    revisionVisita => revisionVisita.idCultivo2
  )
  revisionVisitas: RevisionVisita[];
}
