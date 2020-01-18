import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EnteConvenio } from "./EnteConvenio";
import { Vereda } from "./Vereda";

@Entity("municipio", { schema: "redadelco" })
export class Municipio {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @OneToMany(
    () => EnteConvenio,
    enteConvenio => enteConvenio.idMunicipio2
  )
  enteConvenios: EnteConvenio[];

  @OneToMany(
    () => Vereda,
    vereda => vereda.idMunicipio2
  )
  veredas: Vereda[];
}
