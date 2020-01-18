import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Cargo } from "./Cargo";
import { Usuario } from "./Usuario";
import { Producto } from "./Producto";
import { Pedido } from "./Pedido";

@Index("fk_cargo", ["idCargo"], {})
@Index("fk_usu", ["idUsu"], {})
@Entity("empleado", { schema: "redadelco" })
export class Empleado {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("bigint", { name: "id_usu", nullable: true })
  idUsu: string | null;

  @Column("int", { name: "id_cargo", nullable: true })
  idCargo: number | null;

  @ManyToOne(
    () => Cargo,
    cargo => cargo.empleados,
    { onDelete: "SET NULL", onUpdate: "SET NULL" }
  )
  @JoinColumn([{ name: "id_cargo", referencedColumnName: "id" }])
  idCargo2: Cargo;

  @ManyToOne(
    () => Usuario,
    usuario => usuario.empleados,
    { onDelete: "SET NULL", onUpdate: "SET NULL" }
  )
  @JoinColumn([{ name: "id_usu", referencedColumnName: "id" }])
  idUsu2: Usuario;

  @OneToMany(
    () => Producto,
    producto => producto.idEmp2
  )
  productos: Producto[];

  @OneToMany(
    () => Pedido,
    pedido => pedido.idEmp2
  )
  pedidos: Pedido[];
}
