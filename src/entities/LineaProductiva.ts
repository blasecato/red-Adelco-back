import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Cultivo } from "./Cultivo";
import { CadenaProductiva } from "./CadenaProductiva";

@Index("id_cadena_productiva", ["idCadenaProductiva"], {})
@Entity("linea_productiva", { schema: "redadelco" })
export class LineaProductiva {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre" })
  nombre: string;

  @Column("int", { name: "id_cadena_productiva" })
  idCadenaProductiva: number;

  @OneToMany(
    () => Cultivo,
    cultivo => cultivo.idLineaProductiva2
  )
  cultivos: Cultivo[];

  @ManyToOne(() => CadenaProductiva,cadenaProductiva => cadenaProductiva.lineaProductivas,{ onDelete: "CASCADE", onUpdate: "NO ACTION" })
  @JoinColumn([{ name: "id_cadena_productiva", referencedColumnName: "id" }])
  idCadenaProductiva2: CadenaProductiva;
}
