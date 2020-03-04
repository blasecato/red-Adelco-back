import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cultivo } from "./Cultivo";
import { Finca } from "./Finca";
import { Organizacion } from "./Organizacion";
import { Infraestructura } from "./Infraestructura";
import { Municipio } from "./Municipio";

@Index("id_municipio", ["idMunicipio"], {})
@Entity("vereda", { schema: "redadelco" })
export class Vereda {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("longtext", { name: "nombre", nullable: true })
  nombre: string | null;

  @Column("int", { name: "id_municipio" })
  idMunicipio: number;

  @OneToMany(
    () => Cultivo,
    cultivo => cultivo.idVereda2
  )
  cultivos: Cultivo[];

  @OneToMany(
    () => Finca,
    finca => finca.idVereda2
  )
  fincas: Finca[];

  @OneToMany(
    () => Organizacion,
    organizacion => organizacion.idVereda2
  )
  organizacions: Organizacion[];

  @OneToMany(
    () => Infraestructura,
    infraestructura => infraestructura.idVereda2
  )
  infraestructuras: Infraestructura[];

  @ManyToOne(
    () => Municipio,
    municipio => municipio.veredas,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_municipio", referencedColumnName: "id" }])
  idMunicipio2: Municipio;
}
