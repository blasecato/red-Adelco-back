import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Diagnostico } from "./Diagnostico";
import { Vereda } from "./Vereda";
import { Productores } from "./Productores";

@Index("id_vereda", ["idVereda"], {})
@Entity("finca", { schema: "redadelco" })
export class Finca {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @Column("float", { name: "cant_hectareas", nullable: true, precision: 12 })
  cantHectareas: number | null;

  @Column("longtext", { name: "direccion", nullable: true })
  direccion: string | null;

  @Column("int", { name: "id_vereda", nullable: true })
  idVereda: number | null;

  @OneToMany(
    () => Diagnostico,
    diagnostico => diagnostico.idFinca2
  )
  diagnosticos: Diagnostico[];

  @ManyToOne(
    () => Vereda,
    vereda => vereda.fincas,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_vereda", referencedColumnName: "id" }])
  idVereda2: Vereda;

  @OneToMany(
    () => Productores,
    productores => productores.idFinca2
  )
  productores: Productores[];
}
