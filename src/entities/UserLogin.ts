import { Column, Entity, BaseEntity } from "typeorm";

@Entity("user_login", { schema: "redadelco" })
export class UserLogin extends BaseEntity {
  @Column("int", { primary: true, name: "dni" })
  dni: number;

  @Column("varchar", { name: "nombre", length: 145 })
  nombre: string;

  @Column("varchar", { name: "user", length: 145 })
  user: string;

  @Column("varchar", { name: "password", length: 145 })
  password: string;

  @Column("varchar", { name: "cargo", length: 145 })
  cargo: string;

  @Column("varchar", { nullable: false, length: '50', default: 'active' })
  state: string;
}
