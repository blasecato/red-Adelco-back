import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Productores } from "./Productores";
import { KitHerramienta } from "./KitHerramienta";

@Index("id_kit_herramienta", ["idKitHerramienta"], {})
@Index("id_productor", ["idProductor"], {})
@Entity("kit_user", { schema: "redadelco" })
export class KitUser {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_kit_herramienta", nullable: true })
  idKitHerramienta: number | null;

  @Column("varchar", { name: "id_productor", nullable: true, length: 45 })
  idProductor: string | null;

  @ManyToOne(
    () => Productores,
    productores => productores.kitUsers,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_productor", referencedColumnName: "id" }])
  idProductor2: Productores;

  @ManyToOne(
    () => KitHerramienta,
    kitHerramienta => kitHerramienta.kitUsers,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_kit_herramienta", referencedColumnName: "id" }])
  idKitHerramienta2: KitHerramienta;
}
