import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Productores } from "./Productores";
import { Beneficio } from "./Beneficio";

@Index("id_beneficio", ["idBeneficio"], {})
@Index("id_productor", ["idProductor"], {})
@Entity("productores_beneficio", { schema: "redadelco" })
export class ProductoresBeneficio {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("datetime", { name: "fecha_inicio", nullable: true })
  fechaInicio: Date | null;

  @Column("datetime", { name: "fecha_fin", nullable: true })
  fechaFin: Date | null;

  @Column("varchar", { name: "id_productor", nullable: true, length: 45 })
  idProductor: string | null;

  @Column("int", { name: "id_beneficio", nullable: true })
  idBeneficio: number | null;

  @ManyToOne(
    () => Productores,
    productores => productores.productoresBeneficios,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_productor", referencedColumnName: "id" }])
  idProductor2: Productores;

  @ManyToOne(
    () => Beneficio,
    beneficio => beneficio.productoresBeneficios,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_beneficio", referencedColumnName: "id" }])
  idBeneficio2: Beneficio;
}
