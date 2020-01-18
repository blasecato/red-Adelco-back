import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Vereda } from "./Vereda";
import { Productores } from "./Productores";

@Index("id_vereda", ["idVereda"], {})
@Entity("organizacion", { schema: "redadelco" })
export class Organizacion {
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

  @Column("longtext", { name: "representante", nullable: true })
  representante: string | null;

  @ManyToOne(
    () => Vereda,
    vereda => vereda.organizacions,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_vereda", referencedColumnName: "id" }])
  idVereda2: Vereda;

  @OneToMany(
    () => Productores,
    productores => productores.idOrganizacion2
  )
  productores: Productores[];
}
