import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TipoHerramienta } from "./TipoHerramienta";
import { KitHerramienta } from "./KitHerramienta";

@Entity("herramienta", { schema: "redadelco" })
export class Herramienta {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "descripcion", nullable: true, length: 100 })
  descripcion: string | null;

  @ManyToOne(() => TipoHerramienta, TipoHerramienta => TipoHerramienta.herramientas,{ onUpdate: 'CASCADE', nullable: true })
  @JoinColumn([{ name: 'fk_tipo_herramienta', referencedColumnName: 'id' }])
  tipoHerramienta: TipoHerramienta | null;

  @OneToMany(
    () => KitHerramienta,
    kitHerramienta => kitHerramienta.idHerramienta2
  )
  kitHerramientas: KitHerramienta[];
}
