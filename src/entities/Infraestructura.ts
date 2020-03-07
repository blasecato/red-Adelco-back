import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Convenio } from "./Convenio";
import { TipoInfraestructura } from "./TipoInfraestructura";
import { Vereda } from "./Vereda";

@Index("id_tipo_obra", ["idTipoObra"], {})
@Index("id_vereda", ["idVereda"], {})
@Entity("infraestructura", { schema: "redadelco" })
export class Infraestructura extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre" })
  nombre: string;

  @Column("longtext", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("longtext", { name: "planos", nullable: true })
  planos: string | null;

  @Column("longtext", { name: "direccion", nullable: true })
  direccion: string | null;

  @Column("longtext", { name: "responsable", nullable: true })
  responsable: string | null;

  @Column("longtext", { name: "covertura", nullable: true })
  covertura: string | null;

  @Column("int", { name: "id_tipo_obra", nullable: true })
  idTipoObra: number | null;

  @Column("int", { name: "id_vereda", nullable: true })
  idVereda: number | null;

  @OneToMany(
    () => Convenio,
    convenio => convenio.idInfraestructura2
  )
  convenios: Convenio[];

  @ManyToOne(() => TipoInfraestructura, tipoInfraestructura => tipoInfraestructura.infraestructuras,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_tipo_obra", referencedColumnName: "id" }])
  idTipoObra2: TipoInfraestructura;

  @ManyToOne(() => Vereda, vereda => vereda.infraestructuras, { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_vereda", referencedColumnName: "id" }])
  idVereda2: Vereda;
}
