import {  Column,  Entity,  Index,  JoinColumn,  ManyToOne,  PrimaryGeneratedColumn} from "typeorm";
import { Productores } from "./Productores";
import { KitHerramienta } from "./KitHerramienta";
import { Kit } from "./Kit";
 
@Index("id_kit", ["idKit"], {})
@Index("id_kit_herramienta", ["idKitHerramienta"], {})
@Index("id_productor", ["idProductor"], {})
@Entity("kit_user", { schema: "tcsp_database" })
export class KitUser {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_kit_herramienta", nullable: true })
  idKitHerramienta: number | null;

  @Column("int", { name: "id_kit", nullable: true })
  idKit: number | null;

  @ManyToOne(() => Productores, productores => productores.kitUsers, { onDelete: "CASCADE", onUpdate: "CASCADE" } )
  @JoinColumn([{ name: "id_productor", referencedColumnName: "id" }])
  idProductor: Productores| null;

  @ManyToOne(
    () => KitHerramienta,
    kitHerramienta => kitHerramienta.kitUsers,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_kit_herramienta", referencedColumnName: "id" }])
  idKitHerramienta2: KitHerramienta;

  @ManyToOne(
    () => Kit,
    kit => kit.kitUsers,
    { onDelete: "NO ACTION", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_kit", referencedColumnName: "id" }])
  idKit2: Kit;
}
