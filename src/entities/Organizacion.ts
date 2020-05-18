import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Productores } from "./Productores";
import { Vereda } from "./Vereda";
import { Ico } from "./Ico";
import { Aft } from "./Aft";

@Index("id_representante", ["representante"], {})
@Index("id_vereda", ["idVereda"], {})
@Index("socio", ["socio"], {})
@Entity("organizacion", { schema: "redadelco" })
export class Organizacion extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @Column("longtext", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("int", { name: "contacto", nullable: true })
  contacto: number | null;

  @Column("longtext", { name: "tema_capacitacion", nullable: true })
  temaCapacitacion: string | null;

  @Column("longtext", { name: "tema_empresarial", nullable: true })
  temaEmpresarial: string | null;

  @Column("int", { name: "id_vereda", nullable: true })
  idVereda: number | null;

  @Column("int", { name: "representante", nullable: true })
  representante: number | null;

  @Column("int", { name: "socio", nullable: true })
  socio: number | null;

  @OneToMany(
    () => Aft,
    aft => aft.idOrganizacion2
  )
  afts: Aft[];

  @ManyToOne(
    () => Productores,
    productores => productores.organizacions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "socio", referencedColumnName: "dni" }])
  socio2: Productores;

  @ManyToOne(
    () => Vereda,
    vereda => vereda.organizacions,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_vereda", referencedColumnName: "id" }])
  idVereda2: Vereda;

  @ManyToOne(
    () => Productores,
    productores => productores.organizacions2,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "representante", referencedColumnName: "dni" }])
  representante2: Productores;

  @OneToMany(
    () => Productores,
    productores => productores.idOrganizacion2
  )
  productores: Productores[];

  @ManyToOne(
    () => Ico,
    ico => ico.organizacions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_ico", referencedColumnName: "id" }])
  idIco2: Ico;
}
