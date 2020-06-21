import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Productores } from "./Productores";

@Entity("parentesco", { schema: "redadelco" })
export class Parentesco {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 45 })
  nombre: string | null;

  @OneToMany(() => Productores, productores => productores.idParentesco, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  productores: Productores[];
}
