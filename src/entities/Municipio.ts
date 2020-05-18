import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cultivo } from "./Cultivo";
import { Vereda } from "./Vereda";
import { EnteConvenio } from "./EnteConvenio";
import { GrupoGacc } from "./GrupoGacc";
import { Aft } from "./Aft";

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
    () => GrupoGacc,
    grupoGacc => grupoGacc.idMunicipio2
  )
  grupoGaccs: GrupoGacc[];

  @OneToMany(
    () => EnteConvenio,
    enteConvenio => enteConvenio.idMunicipio2
  )
  enteConvenios: EnteConvenio[];

  @OneToMany(
    () => Aft, aft => aft.idMunicipio2)
  afts: Aft[];
}
