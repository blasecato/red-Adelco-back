import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Infraestructura } from "./Infraestructura";

@Entity("tipo_infraestructura", { schema: "redadelco" })
export class TipoInfraestructura {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre" })
  nombre: string;

  @OneToMany(
    () => Infraestructura,
    infraestructura => infraestructura.idTipoObra2
  )
  infraestructuras: Infraestructura[];
}
