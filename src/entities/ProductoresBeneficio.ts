import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Productores } from "./Productores";
import { Beneficio } from "./Beneficio";

@Index("id_productor", ["idProductor"], {})
@Index("id_beneficio", ["idBeneficio"], {})
@Entity("productores_beneficio", { schema: "tcsp_database" })
export class ProductoresBeneficio {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("datetime", { name: "fecha_inicio", nullable: true })
  fechaInicio: string | null;

  @Column("datetime", { name: "fecha_fin", nullable: true })
  fechaFin: string | null;

  @Column("varchar", { name: "escuela_agroforesteria", nullable: true, length: 50 })
  escuelaAgroforesteria: string | null;

  @Column("varchar", { name: "escuela_agrosilvopastoril", nullable: true, length: 50 })
  escuelaAgrosilvopastoril: string | null;

  @Column("varchar", { name: "escuela_aromaticas", nullable: true, length: 50 })
  escuelaAromaticas: string | null;

  @Column("varchar", { name: "escuela_permacultura", nullable: true, length: 50 })
  escuelaPermacultura: string | null;

  @Column("varchar", { name: "escuela_srcacao", nullable: true, length: 50 })
  escuelaSRCacao: string | null;

  @Column("varchar", { name: "escuela_srpnmb", nullable: true, length: 50 })
  escuelaSRPNMB: string | null;

  @Column("varchar", { name: "parcela_demostrativa", nullable: true, length: 50 })
  parcelaDemostrativa: string | null;

  @Column("varchar", { name: "cacao_planadas", nullable: true, length: 50 })
  cacaoPlanadas: string | null;

  @Column("varchar", { name: "cana_panelera", nullable: true, length: 50 })
  canaPanelera: string | null;

  @Column("varchar", { name: "intercambio_huitora", nullable: true, length: 50 })
  intercambioHuitora: string | null;

  @Column("varchar", { name: "gira_pnmb", nullable: true, length: 50 })
  giraPNMB: string | null;

  @Column("varchar", { name: "gira_cacao", nullable: true, length: 50 })
  giraCacao: string | null;

  @Column("varchar", { name: "poscosecha_cacao", nullable: true, length: 50 })
  poscosechaCacao: string | null;

  @Column("varchar", { name: "transformacion_pulpas", nullable: true, length: 50 })
  transformacionPulpas: string | null;

  @Column("varchar", { name: "manejo_ecosistemico", nullable: true, length: 50 })
  manejoEcosistemico: string | null;

  @Column("varchar", { name: "transformacion_chocolate", nullable: true, length: 50 })
  transformacionChocolate: string | null;

  @Column("varchar", { name: "certificado_organica", nullable: true, length: 50 })
  certificadoOrganica: string | null;

  @Column("varchar", { name: "transformacion_pnmb", nullable: true, length: 50 })
  transformacionPNMB: string | null;

  @Column("varchar", { name: "fitosanitario_cultivos", nullable: true, length: 50 })
  fitosanitarioCultivos: string | null;

  @Column("int", { name: "id_beneficio", nullable: true })
  idBeneficio: number | null;

  @ManyToOne(
    () => Productores,
    productores => productores.productoresBeneficios,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_productor", referencedColumnName: "id" }])
  idProductor: Productores | null;

  @ManyToOne(
    () => Beneficio,
    beneficio => beneficio.productoresBeneficios,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_beneficio", referencedColumnName: "id" }])
  idBeneficio2: Beneficio;
}
