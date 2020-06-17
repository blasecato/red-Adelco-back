import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Organizacion } from "./Organizacion";
import { Productores } from "./Productores";

@Index('id', ['id'], { unique: true })
@Entity("productor_organizacion", { schema: "tcsp_database" })
export class ProductorOrganizacion {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column('varchar', { nullable: true, length: 255, default: 'activo' })
    estado: string | null;

    @ManyToOne(() => Organizacion, organizacion => organizacion.productoresOrganizaciones, { onUpdate: 'CASCADE' },)
    @JoinColumn([{ name: 'fk_organizacion', referencedColumnName: 'id' }])
    idOrganizacion: Organizacion;

    @ManyToOne(() => Productores, Productores => Productores.productoresOrganizaciones, { onUpdate: 'CASCADE' },)
    @JoinColumn([{ name: 'fk_productor', referencedColumnName: 'dni' }])
    idProductor: Productores;

}