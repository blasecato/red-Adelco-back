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

@Index("id_linea_productiva", ["idLineaProductiva"], {})
@Index("id_productor", ["idProductor"], {})
@Index("id_acepta", ["idAcepta"], {})
@Entity("cultivo", { schema: "redadelco" })
export class Cultivo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre" })
  nombre: string;

  @Column("float", { name: "hectareas", precision: 12 })
  hectareas: number;

  @Column("date", { name: "fecha_inicio" })
  fechaInicio: string;

  @Column("int", { name: "id_linea_productiva" })
  idLineaProductiva: number;

  @Column("int", { name: "id_productor" })
  idProductor: number;

  @Column("int", { name: "id_acepta" })
  idAcepta: number;

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
