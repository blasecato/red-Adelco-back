import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { KitHerramienta } from "./KitHerramienta";

@Entity("kit", { schema: "redadelco" })
export class Kit {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre" })
  nombre: string;

  @Column("longtext", { name: "image_acta" })
  imageActa: string;

  @OneToMany(
    () => KitHerramienta,
    kitHerramienta => kitHerramienta.idKit2
  )
  kitHerramientas: KitHerramienta[];
}
