import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  BaseEntity
} from "typeorm";
import { Cultivo } from "./Cultivo";
import { Organizacion } from "./Organizacion";
import { KitUser } from "./KitUser";
import { ProductorOrg } from "./ProductorOrg";
import { ProductoresBeneficio } from "./ProductoresBeneficio";
import { Conflicto } from "./Conflicto";
import { Parentesco } from "./Parentesco";
import { Discapacidad } from "./Discapacidad";
import { Genero } from "./Genero";
import { Finca } from "./Finca";
import { GrupoEtnico } from "./GrupoEtnico";
import { CargoOrg } from "./CargoOrg";

@Index("id", ["id"], {})
@Index("id_cargo_org", ["idCargoOrg"], {})
@Index("id_conflicto", ["idConflicto"], {})
@Index("id_discapacitado", ["idDiscapacitado"], {})
@Index("id_etnia", ["idEtnia"], {})
@Index("id_finca", ["idFinca"], {})
@Index("id_genero", ["idGenero"], {})
@Index("id_organizacion", ["idOrganizacion"], {})
@Index("id_parentesco", ["idParentesco"], {})
@Index("id_productor", ["idProductor"], {})
@Entity("productores", { schema: "redadelco" })
export class Productores extends BaseEntity {

  @Column("varchar", { name: "id", length: 145 })
  id: string;

  @Column("longtext", { name: "nombres" })
  nombres: string;

  @Column("longtext", { name: "apellidos" })
  apellidos: string;

  @Column("int", { primary: true, name: "dni" })
  dni: number;

  @Column("int", { name: "edad", nullable: true })
  edad: number | null;

  @Column("bigint", { name: "telefono", nullable: true })
  telefono: string | null;

  @Column("varchar", { name: "id_productor", nullable: true, length: 45 })
  idProductor: string | null;

  @Column("int", { name: "id_conflicto", nullable: true })
  idConflicto: number | null;

  @Column("int", { name: "id_genero" })
  idGenero: number;

  @Column("int", { name: "id_organizacion", nullable: true })
  idOrganizacion: number | null;

  @Column("int", { name: "id_finca", nullable: true })
  idFinca: number | null;

  @Column("int", { name: "id_etnia", nullable: true })
  idEtnia: number | null;

  @Column("int", { name: "id_parentesco", nullable: true })
  idParentesco: number | null;

  @Column("int", { name: "id_discapacitado", nullable: true })
  idDiscapacitado: number | null;

  @Column("int", { name: "id_zona", nullable: true })
  idZona: number | null;

  @Column("int", { name: "id_cargo_org", nullable: true })
  idCargoOrg: number | null;

  @OneToMany(
    () => Cultivo,
    cultivo => cultivo.idProductor2
  )
  cultivos: Cultivo[];

  @OneToMany(
    () => Organizacion,
    organizacion => organizacion.representante2
  )
  organizacions: Organizacion[];

  @OneToMany(
    () => KitUser,
    kitUser => kitUser.idProductor2
  )
  kitUsers: KitUser[];

  @OneToMany(
    () => ProductorOrg,
    productorOrg => productorOrg.idProductor2
  )
  productorOrgs: ProductorOrg[];

  @OneToMany(
    () => ProductorOrg,
    productorOrg => productorOrg.idProductor3
  )
  productorOrgs2: ProductorOrg[];

  @OneToMany(
    () => ProductorOrg,
    productorOrg => productorOrg.idProductor4
  )
  productorOrgs3: ProductorOrg[];

  @OneToMany(
    () => ProductoresBeneficio,
    productoresBeneficio => productoresBeneficio.idProductor2
  )
  productoresBeneficios: ProductoresBeneficio[];

  @ManyToOne(
    () => Conflicto,
    conflicto => conflicto.productores,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_conflicto", referencedColumnName: "id" }])
  idConflicto2: Conflicto;

  @ManyToOne(
    () => Parentesco,
    parentesco => parentesco.productores,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_parentesco", referencedColumnName: "id" }])
  idParentesco2: Parentesco;

  @ManyToOne(
    () => Discapacidad,
    discapacidad => discapacidad.productores,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_discapacitado", referencedColumnName: "id" }])
  idDiscapacitado2: Discapacidad;

  @ManyToOne(
    () => Genero,
    genero => genero.productores,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_genero", referencedColumnName: "id" }])
  idGenero2: Genero;

  @ManyToOne(
    () => Organizacion,
    organizacion => organizacion.productores,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_organizacion", referencedColumnName: "id" }])
  idOrganizacion2: Organizacion;

  @ManyToOne(
    () => Finca,
    finca => finca.productores,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_finca", referencedColumnName: "id" }])
  idFinca2: Finca;

  @ManyToOne(
    () => GrupoEtnico,
    grupoEtnico => grupoEtnico.productores,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_etnia", referencedColumnName: "id" }])
  idEtnia2: GrupoEtnico;

  @ManyToOne(
    () => Productores,
    productores => productores.productores,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_productor", referencedColumnName: "id" }])
  idProductor2: Productores;

  @OneToMany(
    () => Productores,
    productores => productores.idProductor2
  )
  productores: Productores[];

  @ManyToOne(
    () => CargoOrg,
    cargoOrg => cargoOrg.productores,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_cargo_org", referencedColumnName: "id" }])
  idCargoOrg2: CargoOrg;

  @OneToMany(
    () => Organizacion,
    organizacion => organizacion.socio2
  )
  organizacions2: Organizacion[];
}
