import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { KitHerramienta } from "./KitHerramienta";
import { Productores } from "./Productores";

@Index("id_kit_herramienta", ["idKitHerramienta"], {})
@Index("id_productor", ["idProductor"], {})
@Entity("kit_user", { schema: "redadelco" })
export class KitUser {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_kit_herramienta" })
  idKitHerramienta: number;

  @Column("int", { name: "id_productor" })
  idProductor: number;

  @ManyToOne(
    () => KitHerramienta,
    kitHerramienta => kitHerramienta.kitUsers,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_kit_herramienta", referencedColumnName: "id" }])
  idKitHerramienta2: KitHerramienta;

  @ManyToOne(
    () => Productores,
    productores => productores.kitUsers,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_productor", referencedColumnName: "id" }])
  idProductor2: Productores;
}
