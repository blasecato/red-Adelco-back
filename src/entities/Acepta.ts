import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cultivo } from "./Cultivo";

@Entity("acepta", { schema: "redadelco" })
export class Acepta {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre" })
  nombre: string;

  @Column("longtext", { name: "image" })
  image: string;

  @Column("date", { name: "fecha_acepta" })
  fechaAcepta: string;

  @OneToMany(
    () => Cultivo,
    cultivo => cultivo.idAcepta2
  )
  cultivos: Cultivo[];
}
