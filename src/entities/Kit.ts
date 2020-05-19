import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { KitHerramienta } from "./KitHerramienta";
import { KitUser } from "./KitUser";

@Entity("kit", { schema: "tcsp_database" })
export class Kit {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @Column("longtext", { name: "image_acta", nullable: true })
  imageActa: string | null;

  @OneToMany(
    () => KitHerramienta,
    kitHerramienta => kitHerramienta.idKit2
  )
  kitHerramientas: KitHerramienta[];

  @OneToMany(
    () => KitUser,
    kitUser => kitUser.idKit2
  )
  kitUsers: KitUser[];
}
