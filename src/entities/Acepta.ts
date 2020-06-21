import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cultivo } from "./Cultivo";

@Entity("acepta", { schema: "tcsp_database" })
export class Acepta {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @Column("longtext", { name: "image", nullable: true })
  image: string | null;

  @Column("date", { name: "fecha_acepta", nullable: true })
  fechaAcepta: string | null;

  @OneToMany(() => Cultivo, cultivo => cultivo.idAcepta2)
  cultivos: Cultivo[];
}
