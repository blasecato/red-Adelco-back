import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Cultivo } from "./Cultivo";
import { KitUser } from "./KitUser";
import { ProductoresBeneficio } from "./ProductoresBeneficio";
import { Genero } from "./Genero";
import { Organizacion } from "./Organizacion";
import { Finca } from "./Finca";
import { GrupoEtnico } from "./GrupoEtnico";

@Index("id_genero", ["idGenero"], {})
@Index("id_organizacion", ["idOrganizacion"], {})
@Index("id_finca", ["idFinca"], {})
@Index("id_etnia", ["idEtnia"], {})
@Index("id_parentesco", ["idParentesco"], {})
@Entity("productores", { schema: "redadelco" })
export class Productores {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombres" })
  nombres: string;

  @Column("longtext", { name: "apellidos" })
  apellidos: string;

  @Column("int", { name: "dni" })
  dni: number;

  @Column("date", { name: "fecha_nacimiento" })
  fechaNacimiento: string;

  @Column("int", { name: "telefono" })
  telefono: number;

  @Column("int", { name: "victima" })
  victima: number;

  @Column("int", { name: "id_genero" })
  idGenero: number;

  @Column("int", { name: "id_organizacion" })
  idOrganizacion: number;

  @Column("int", { name: "id_finca" })
  idFinca: number;

  @Column("int", { name: "id_etnia" })
  idEtnia: number;

  @Column("int", { name: "id_parentesco" })
  idParentesco: number;

  @OneToMany(
    () => Cultivo,
    cultivo => cultivo.idProductor2
  )
  cultivos: Cultivo[];

  @OneToMany(
    () => KitUser,
    kitUser => kitUser.idProductor2
  )
  kitUsers: KitUser[];

  @OneToMany(
    () => ProductoresBeneficio,
    productoresBeneficio => productoresBeneficio.idProductor2
  )
  productoresBeneficios: ProductoresBeneficio[];

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
  @JoinColumn([{ name: "id_parentesco", referencedColumnName: "id" }])
  idParentesco2: Productores;

  @OneToMany(
    () => Productores,
    productores => productores.idParentesco2
  )
  productores: Productores[];
}
