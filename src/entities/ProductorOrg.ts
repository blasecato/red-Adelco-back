import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Productores } from "./Productores";

@Index("id_productor", ["idProductor"], {})
@Entity("productor_org", { schema: "redadelco" })
export class ProductorOrg {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_productor" })
  idProductor: number;

  @Column("int", { name: "id_organizacion" })
  idOrganizacion: number;

  @Column("int", { name: "id_cargo_org", nullable: true })
  idCargoOrg: number | null;

  @ManyToOne(
    () => Productores,
    productores => productores.productorOrgs,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_productor", referencedColumnName: "dni" }])
  productorOrg: Productores;
}
