import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("zona", { schema: "redadelco" })
export class Zona {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", nullable: true, length: 45 })
  nombre: string | null;
}
