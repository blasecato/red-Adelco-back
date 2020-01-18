import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Proveedor } from "./Proveedor";
import { Pedido } from "./Pedido";
import { Empleado } from "./Empleado";

@Index("fk_proveedor", ["idProv"], {})
@Index("fk_empleado", ["idEmp"], {})
@Entity("producto", { schema: "redadelco" })
export class Producto {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("int", { name: "precio_c" })
  precioC: number;

  @Column("int", { name: "precio_v" })
  precioV: number;

  @Column("date", { name: "fecha_c" })
  fechaC: string;

  @Column("varchar", { name: "image", length: 100 })
  image: string;

  @Column("int", { name: "cant_comprada" })
  cantComprada: number;

  @Column("int", { name: "id_emp", nullable: true })
  idEmp: number | null;

  @Column("int", { name: "id_prov", nullable: true })
  idProv: number | null;

  @ManyToOne(
    () => Proveedor,
    proveedor => proveedor.productos,
    { onDelete: "SET NULL", onUpdate: "SET NULL" }
  )
  @JoinColumn([{ name: "id_prov", referencedColumnName: "id" }])
  idProv2: Proveedor;

  @OneToMany(
    () => Pedido,
    pedido => pedido.idPro2
  )
  pedidos: Pedido[];

  @ManyToOne(
    () => Empleado,
    empleado => empleado.productos,
    { onDelete: "SET NULL", onUpdate: "SET NULL" }
  )
  @JoinColumn([{ name: "id_emp", referencedColumnName: "id" }])
  idEmp2: Empleado;
}
