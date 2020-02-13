import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cargo", { schema: "redadelco" })
export class Cargo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;
}
