import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cultivo } from "./Cultivo";
import { Vereda } from "./Vereda";
import { EnteConvenio } from "./EnteConvenio";

@Entity("municipio", { schema: "redadelco" })
export class Municipio {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @OneToMany(
    () => Cultivo,
    cultivo => cultivo.idMunicipio2
  )
  cultivos: Cultivo[];

  @OneToMany(
    () => Vereda,
    vereda => vereda.idMunicipio2
  )
  veredas: Vereda[];

  @OneToMany(
    () => EnteConvenio,
    enteConvenio => enteConvenio.idMunicipio2
  )
  enteConvenios: EnteConvenio[];
}
