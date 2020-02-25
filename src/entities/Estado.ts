import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("estado", { schema: "redadelco" })
export class Estado {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;
}
