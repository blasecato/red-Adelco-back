import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";
import { Productores } from "./Productores";

@Entity("genero", { schema: "redadelco" })
export class Genero {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @OneToMany(
    () => Usuario,
    usuario => usuario.idGenero2
  )
  usuarios: Usuario[];

  @OneToMany(
    () => Productores,
    productores => productores.idGenero2
  )
  productores: Productores[];
}
