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

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @Column("int", { name: "intencidad", nullable: true })
  intencidad: number | null;

  @Column("int", { name: "id_tipo_beneficio", nullable: true })
  idTipoBeneficio: number | null;

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
