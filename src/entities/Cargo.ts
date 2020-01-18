import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Empleado } from "./Empleado";
import { Usuario } from "./Usuario";

@Entity("cargo", { schema: "redadelco" })
export class Cargo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @OneToMany(
    () => Empleado,
    empleado => empleado.idCargo2
  )
  empleados: Empleado[];

  @OneToMany(
    () => Usuario,
    usuario => usuario.idCargo2
  )
  usuarios: Usuario[];
}
