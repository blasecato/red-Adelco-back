import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Productores } from "./Productores";
import { Vereda } from "./Vereda";
import { Ico } from "./Ico";
import { Aft } from "./Aft";
import { ProductorOrganizacion } from "./ProductorOrganizacion";

@Index("id_representante", ["representante2"], {})
@Index("id_vereda", ["idVereda2"], {})
@Index("socio", ["socio"], {})
@Index('id', ['id'], { unique: true })
@Entity("organizacion", { schema: "redadelco" })
export class Organizacion extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @Column("longtext", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("longtext", { name: "contacto", nullable: true })
  contacto: string | null;

  @Column("longtext", { name: "tema_capacitacion", nullable: true })
  temaCapacitacion: string | null;

  @Column("longtext", { name: "tema_empresarial", nullable: true })
  temaEmpresarial: string | null;

  @Column("longtext", { name: "focalizacion", nullable: true })
  focalizacion: string | null;

  @Column("longtext", { name: "aplicacion_ico", nullable: true })
  aplicacionICO: string | null;

  @Column("longtext", { name: "diagnostico_ico", nullable: true })
  diagnosticoICO: string | null;

  @Column("longtext", { name: "tipo_aft", nullable: true })
  tipoAft: string | null;

  @Column("longtext", { name: "participacion_mesa_mujer_genero", nullable: true })
  participacionMesaMujerGenero: string | null;

  @Column("int", { name: "socio", nullable: true })
  socio: number | null;

  @Column("int", { name: "id_ico", nullable: true })
  idIco: number | null;

  @OneToMany(
    () => Aft,
    aft => aft.idOrganizacion2
  )
  afts: Aft[];

  @ManyToOne(
    () => Productores,
    productores => productores.organizacions,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "socio", referencedColumnName: "dni" }])
  socio2: Productores;

  @ManyToOne(() => Vereda, vereda => vereda.organizacions, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "id_vereda", referencedColumnName: "id" }])
  idVereda2: Vereda;

  @ManyToOne(
    () => Productores,
    productores => productores.organizacions,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "representante", referencedColumnName: "dni" }])
  representante2: Productores;

  @ManyToOne(() => Ico, ico => ico.organizacions, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn([{ name: "id_ico", referencedColumnName: "id" }])
  idIco2: Ico;

  @OneToMany(() => ProductorOrganizacion, productor_organizacion => productor_organizacion.idOrganizacion,)
  productoresOrganizaciones: ProductorOrganizacion[];
}
