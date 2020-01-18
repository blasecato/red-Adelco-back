import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Factura } from "./Factura";
import { Genero } from "./Genero";
import { Empleado } from "./Empleado";
import { Cargo } from "./Cargo";

@Index("fk_cargo", ["idCargo"], {})
@Index("fk_genero", ["idGenero"], {})
@Entity("usuario", { schema: "redadelco" })
export class Usuario {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "dni" })
  dni: string;

  @Column("varchar", { name: "nombres", length: 100 })
  nombres: string;

  @Column("varchar", { name: "apeliidos", length: 100 })
  apeliidos: string;

  @Column("date", { name: "fecha_registro" })
  fechaRegistro: string;

  @Column("varchar", { name: "email", length: 100 })
  email: string;

  @Column("varchar", { name: "contrasenia", length: 100 })
  contrasenia: string;

  @Column("int", { name: "telefoto" })
  telefoto: number;

  @Column("varchar", { name: "nombre_em", length: 100 })
  nombreEm: string;

  @Column("varchar", { name: "direccion", length: 100 })
  direccion: string;

  @Column("int", { name: "id_genero", nullable: true })
  idGenero: number | null;

  @Column("int", { name: "id_cargo", nullable: true })
  idCargo: number | null;

  @OneToMany(
    () => Factura,
    factura => factura.idUsu
  )
  facturas: Factura[];

  @ManyToOne(
    () => Genero,
    genero => genero.usuarios,
    { onDelete: "SET NULL", onUpdate: "SET NULL" }
  )
  @JoinColumn([{ name: "id_genero", referencedColumnName: "id" }])
  idGenero2: Genero;

  @OneToMany(
    () => Empleado,
    empleado => empleado.idUsu2
  )
  empleados: Empleado[];

  @ManyToOne(
    () => Cargo,
    cargo => cargo.usuarios,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_cargo", referencedColumnName: "id" }])
  idCargo2: Cargo;
}
