import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Factura } from "./Factura";
import { Producto } from "./Producto";
import { Empleado } from "./Empleado";

@Index("fk_factura", ["idFac"], {})
@Index("fk_producto", ["idPro"], {})
@Index("fk_empleado", ["idEmp"], {})
@Entity("pedido", { schema: "redadelco" })
export class Pedido {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "cant" })
  cant: number;

  @Column("int", { name: "total" })
  total: number;

  @Column("int", { name: "id_emp", nullable: true })
  idEmp: number | null;

  @Column("int", { name: "id_pro", nullable: true })
  idPro: number | null;

  @Column("int", { name: "id_fac", nullable: true })
  idFac: number | null;

  @ManyToOne(
    () => Factura,
    factura => factura.pedidos,
    { onDelete: "SET NULL", onUpdate: "SET NULL" }
  )
  @JoinColumn([{ name: "id_fac", referencedColumnName: "id" }])
  idFac2: Factura;

  @ManyToOne(
    () => Producto,
    producto => producto.pedidos,
    { onDelete: "SET NULL", onUpdate: "SET NULL" }
  )
  @JoinColumn([{ name: "id_pro", referencedColumnName: "id" }])
  idPro2: Producto;

  @ManyToOne(
    () => Empleado,
    empleado => empleado.pedidos,
    { onDelete: "SET NULL", onUpdate: "SET NULL" }
  )
  @JoinColumn([{ name: "id_emp", referencedColumnName: "id" }])
  idEmp2: Empleado;
}
