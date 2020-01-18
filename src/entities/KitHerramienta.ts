import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Kit } from "./Kit";
import { Herramienta } from "./Herramienta";
import { KitUser } from "./KitUser";

@Index("id_kit", ["idKit"], {})
@Index("id_herramienta", ["idHerramienta"], {})
@Entity("kit_herramienta", { schema: "redadelco" })
export class KitHerramienta {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_kit" })
  idKit: number;

  @Column("int", { name: "id_herramienta" })
  idHerramienta: number;

  @ManyToOne(
    () => Kit,
    kit => kit.kitHerramientas,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_kit", referencedColumnName: "id" }])
  idKit2: Kit;

  @ManyToOne(
    () => Herramienta,
    herramienta => herramienta.kitHerramientas,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_herramienta", referencedColumnName: "id" }])
  idHerramienta2: Herramienta;

  @OneToMany(
    () => KitUser,
    kitUser => kitUser.idKitHerramienta2
  )
  kitUsers: KitUser[];
}
