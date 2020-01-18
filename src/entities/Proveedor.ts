import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";

@Entity("proveedor", { schema: "redadelco" })
export class Proveedor {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("int", { name: "telefoto" })
  telefoto: number;

  @Column("varchar", { name: "direccion", length: 100 })
  direccion: string;

  @OneToMany(
    () => Producto,
    producto => producto.idProv2
  )
  productos: Producto[];
}
