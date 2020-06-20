import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Herramienta } from "./Herramienta";
import { Kit } from "./Kit";
import { KitUser } from "./KitUser";

@Index("id_herramienta", ["idHerramienta"], {})
@Index("id_kit", ["idKit"], {})
@Entity("kit_herramienta", { schema: "redadelco" })
export class KitHerramienta {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_kit", nullable: true })
  idKit: number | null;

  @Column("int", { name: "id_herramienta", nullable: true })
  idHerramienta: number | null;

  @ManyToOne(
    () => Herramienta,
    herramienta => herramienta.kitHerramientas,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_herramienta", referencedColumnName: "id" }])
  idHerramienta2: Herramienta;

  @ManyToOne(
    () => Kit,
    kit => kit.kitHerramientas,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_kit", referencedColumnName: "id" }])
  idKit2: Kit;

  @OneToMany(
    () => KitUser,
    kitUser => kitUser.idKitHerramienta2
  )
  kitUsers: KitUser[];
}
