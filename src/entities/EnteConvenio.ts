import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Municipio } from "./Municipio";
import { Convenio } from "./Convenio";

@Index("id_municipio", ["idMunicipio"], {})
@Entity("ente_convenio", { schema: "redadelco" })
export class EnteConvenio {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre" })
  nombre: string;

  @Column("longtext", { name: "hubicacion", nullable: true })
  hubicacion: string | null;

  @Column("longtext", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("int", { name: "id_municipio", nullable: true })
  idMunicipio: number | null;

  @ManyToOne(
    () => Municipio,
    municipio => municipio.enteConvenios,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_municipio", referencedColumnName: "id" }])
  idMunicipio2: Municipio;

  @OneToMany(
    () => Convenio,
    convenio => convenio.idEnteConvenio2
  )
  convenios: Convenio[];
}
