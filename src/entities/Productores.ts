import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Aft } from "./Aft";
import { Genero } from "./Genero";
import { Organizacion } from "./Organizacion";
import { Conflicto } from "./Conflicto";
import { Discapacidad } from "./Discapacidad";
import { ProductoresBeneficio } from "./ProductoresBeneficio";
import { KitUser } from "./KitUser";
import { GrupoEtnico } from "./GrupoEtnico";
import { ProductorOrg } from "./ProductorOrg";
import { CargoOrg } from "./CargoOrg";
import { Parentesco } from "./Parentesco";
import { Finca } from "./Finca";
import { Cultivo } from "./Cultivo";
import { ProductorOrganizacion } from "./ProductorOrganizacion";
import { Zona } from "./Zona";
import { User } from "./User";

@Index('id', ['id'], {})
@Index('dni', ['dni'], { unique: true })
@Index("id_cargo_org", ["idCargoOrg"], {})
@Index("id_conflicto", ["idConflicto"], {})
@Index("id_discapacitado", ["idDiscapacitado"], {})
@Index("id_etnia", ["idEtnia"], {})
@Index("id_finca", ["idFinca"], {})
@Index("id_genero", ["idGenero"], {})
@Index("id_zona", ["idZona"], {})
@Index("id_productor", ["idProductor"], {})
@Index("id_parentesco", ["idParentesco"], {})
@Entity("productores", { schema: "tcsp_database" })
export class Productores {
  @Column("varchar", { nullable: true, name: "id", length: 145 })
  id: string | null;

  @Column("longtext", { name: "nombres" })
  nombres: string;

  @Column("longtext", { name: "apellidos" })
  apellidos: string;

  @Column("int", { primary: true, name: "dni" })
  dni: number;

  @Column("int", { name: "edad", nullable: true })
  edad: number | null;

  @Column("varchar", { name: "telefono", nullable: true, length: 10 })
  telefono: string | null;

  @Column("varchar", { nullable: false, length: '50', default: 'active' })
  state: string;

  @ManyToOne(() => Genero, genero => genero.productores, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "id_genero", referencedColumnName: "id" }])
  idGenero: Genero | null;

  @ManyToOne(() => Conflicto, conflicto => conflicto.productores, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "id_conflicto", referencedColumnName: "id" }])
  idConflicto: Conflicto | null;

  @ManyToOne(() => Discapacidad, discapacidad => discapacidad.productores, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "id_discapacitado", referencedColumnName: "id" }])
  idDiscapacitado: Discapacidad | null;

  @ManyToOne(() => Zona, Zona => Zona.producers, { onDelete: "NO ACTION", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "id_kit", referencedColumnName: "id" }])
  idZona: Zona | null;

  @ManyToOne(() => Productores, productores => productores.productores, { onDelete: "NO ACTION", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "id_productor", referencedColumnName: "id" }])
  idProductor: Productores | null;

  @ManyToOne(() => GrupoEtnico, grupoEtnico => grupoEtnico.productores, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "id_etnia", referencedColumnName: "id" }])
  idEtnia: GrupoEtnico | null;

  @ManyToOne(() => CargoOrg, cargoOrg => cargoOrg.productores, { onDelete: "NO ACTION", onUpdate: "CASCADE" } )
  @JoinColumn([{ name: "id_cargo_org", referencedColumnName: "id" }])
  idCargoOrg: CargoOrg | null;

  @ManyToOne(() => Parentesco, parentesco => parentesco.productores, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "id_parentesco" }])
  idParentesco: Parentesco | null;

  @ManyToOne(() => Finca, finca => finca.productores, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "id_finca", referencedColumnName: "id" }])
  idFinca: Finca | null;

  @OneToMany(() => Productores, productores => productores.idProductor)
  productores: Productores[];

  @OneToMany(() => Organizacion, organizacion => organizacion.representante2)
  organizacions: Organizacion[];

  @OneToMany(() => ProductorOrg, productorOrg => productorOrg.idProductor)
  productorOrgs: ProductorOrg[];

  @OneToMany(() => Organizacion, organizacion => organizacion.socio2)
  organizacionSocios: Organizacion[];

  @OneToMany(() => KitUser, kitUser => kitUser.idProductor)
  kitUsers: KitUser[];

  @OneToMany(() => Aft, aft => aft.idProductor)
  afts: Aft[];

  @OneToMany(() => Cultivo, cultivo => cultivo.dniProductor2)
  cultivos: Cultivo[];

  @OneToMany(() => Cultivo, cultivo => cultivo.codigoProductor2)
  cultivos2: Cultivo[];

  @OneToMany(() => ProductorOrganizacion, productor_organizacion => productor_organizacion.dniProductor)
  productoresOrganizaciones: ProductorOrganizacion[];

  @OneToMany(() => ProductoresBeneficio, productoresBeneficio => productoresBeneficio.idProductor)
  productoresBeneficios: ProductoresBeneficio[];

  @OneToOne(() => User, User => User.dniProducer,)
  user: User;

}
