import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { TipoBeneficio } from "./TipoBeneficio";
import { ProductoresBeneficio } from "./ProductoresBeneficio";

@Index("id_tipo_beneficio", ["idTipoBeneficio"], {})
@Entity("beneficio", { schema: "redadelco" })
export class Beneficio {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre" })
  nombre: string;

  @Column("int", { name: "intencidad" })
  intencidad: number;

  @Column("int", { name: "id_tipo_beneficio" })
  idTipoBeneficio: number;

  @ManyToOne(
    () => TipoBeneficio,
    tipoBeneficio => tipoBeneficio.beneficios,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_tipo_beneficio", referencedColumnName: "id" }])
  idTipoBeneficio2: TipoBeneficio;

  @OneToMany(
    () => ProductoresBeneficio,
    productoresBeneficio => productoresBeneficio.idBeneficio2
  )
  productoresBeneficios: ProductoresBeneficio[];
}
