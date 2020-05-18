import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Aft } from "./Aft";
import { Vereda } from "./Vereda";
import { Cultivo } from "./Cultivo";
import { EnteConvenio } from "./EnteConvenio";
import { GrupoGacc } from "./GrupoGacc";

@Entity("municipio", { schema: "tcsp_database" })
export class Municipio {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @OneToMany(
    () => Aft,
    aft => aft.idMunicipio2
  )
  afts: Aft[];

  @OneToMany(
    () => Vereda,
    vereda => vereda.idMunicipio2
  )
  veredas: Vereda[];

  @OneToMany(
    () => Cultivo,
    cultivo => cultivo.idMunicipio2
  )
  cultivos: Cultivo[];

  @OneToMany(
    () => EnteConvenio,
    enteConvenio => enteConvenio.idMunicipio2
  )
  enteConvenios: EnteConvenio[];

  @OneToMany(
    () => GrupoGacc,
    grupoGacc => grupoGacc.idMunicipio2
  )
  grupoGaccs: GrupoGacc[];
}
