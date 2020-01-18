import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LineaProductiva } from "./LineaProductiva";

@Entity("cadena_productiva", { schema: "redadelco" })
export class CadenaProductiva {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre" })
  nombre: string;

  @OneToMany(
    () => LineaProductiva,
    lineaProductiva => lineaProductiva.idCadenaProductiva2
  )
  lineaProductivas: LineaProductiva[];
}
