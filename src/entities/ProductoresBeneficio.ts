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

@Index("id_productor", ["idProductor"], {})
@Index("id_beneficio", ["idBeneficio"], {})
@Entity("productores_beneficio", { schema: "redadelco" })
export class ProductoresBeneficio {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("datetime", { name: "fecha_inicio" })
  fechaInicio: Date;

  @Column("datetime", { name: "fecha_fin" })
  fechaFin: Date;

  @Column("int", { name: "id_productor" })
  idProductor: number;

  @Column("int", { name: "id_beneficio" })
  idBeneficio: number;

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
