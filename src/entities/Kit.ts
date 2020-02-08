import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { KitHerramienta } from "./KitHerramienta";

@Entity("kit", { schema: "redadelco" })
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
}
