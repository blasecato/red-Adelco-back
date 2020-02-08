import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Beneficio } from "./Beneficio";

@Entity("tipo_beneficio", { schema: "redadelco" })
export class TipoBeneficio {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @OneToMany(
    () => Beneficio,
    beneficio => beneficio.idTipoBeneficio2
  )
  beneficios: Beneficio[];
}
