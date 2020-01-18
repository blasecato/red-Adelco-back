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

  @Column("float", { name: "cant_hectareas", precision: 12 })
  cantHectareas: number;

  @Column("longtext", { name: "direccion" })
  direccion: string;

  @Column("int", { name: "id_vereda" })
  idVereda: number;

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
