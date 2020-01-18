import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Usuario } from "./Usuario";
import { Pedido } from "./Pedido";

@Entity("factura", { schema: "redadelco" })
export class Factura {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "total_f" })
  totalF: number;

  @Column("date", { name: "fecha" })
  fecha: string;

  @ManyToOne(
    () => Usuario,
    usuario => usuario.facturas,
    { onDelete: "SET NULL", onUpdate: "SET NULL" }
  )
  @JoinColumn([{ name: "id_usu", referencedColumnName: "id" }])
  idUsu: Usuario;

  @OneToMany(
    () => Pedido,
    pedido => pedido.idFac2
  )
  pedidos: Pedido[];
}
