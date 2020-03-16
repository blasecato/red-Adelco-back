import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProducersRepository } from './producers.repository';
import { GeneroRepository } from '../gender/gender.repository';
import { Discapacidad } from '../entities/Discapacidad';
import { Organizacion } from '../entities/Organizacion';
import { CropsService } from '../crops/crops.service';
import { Productores } from '../entities/Productores';
import { GrupoEtnico } from '../entities/GrupoEtnico';
import { Parentesco } from '../entities/Parentesco';
import { Conflicto } from '../entities/Conflicto';
import { CargoOrg } from '../entities/CargoOrg';
import { RelationshipRepository } from '../relationship/relationship.repository';
import { Cultivo } from 'src/entities/Cultivo';
import { relative } from 'path';

@Injectable()
export class ProducersService {

  constructor(
    @InjectRepository(ProducersRepository) private readonly _ProducersRepository: ProducersRepository,
    @InjectRepository(GeneroRepository) private readonly _GeneroRepository: GeneroRepository,
    @InjectRepository(RelationshipRepository) private readonly _RelationshipRepository: RelationshipRepository,
    @InjectRepository(GrupoEtnico) private readonly GrupoEtnicoRepository: Repository<GrupoEtnico>,
    @InjectRepository(CargoOrg) private readonly CargoOrgRepository: Repository<CargoOrg>,
    @InjectRepository(Parentesco) private readonly ParentescoRepository: Repository<Parentesco>,
    @InjectRepository(Discapacidad) private readonly DiscapacidadRepository: Repository<Discapacidad>,
    @InjectRepository(Conflicto) private readonly ConflictoRepository: Repository<Conflicto>,
    @InjectRepository(Organizacion) private readonly OrganizacionRepository: Repository<Organizacion>,
    @InjectRepository(Cultivo) private readonly cropRepository: Repository<Cultivo>
  ) { }

  async createProducers(signupProducer) {

    const { id, nombres, apellidos, dni, edad, telefono, idGenero } = signupProducer

    const producerExists = await this._ProducersRepository.findOne({
      where: { dni },
    });

    if (producerExists) throw new ConflictException('dni already exists');

    const producer = new Productores();
    producer.id = id;
    producer.nombres = nombres;
    producer.apellidos = apellidos;
    producer.dni = dni;
    producer.edad = edad;
    producer.telefono = telefono;
    producer.idGenero = idGenero;

    return await this._ProducersRepository.save(producer)
  }

  async getProducersAll() {
    const producers = await this._ProducersRepository.find({})
    return producers
  }

  async updateProducer(body) {
    const producerExists = await this._ProducersRepository.findOne({
      where: { dni: body.dni },
    });

    if (!producerExists) throw new ConflictException('producer does not exist');

    const { dni, ...results } = body

    console.log(results)

    const producers = await this._ProducersRepository
      .update(dni, results)

    return producers
  }

  async getProducerGender() {

    const genderCount = {
      woman: {
        count: null,
        arraywoman: []
      },
      men: {
        count: null,
        arraymen: []
      }
    };

    genderCount.woman.count = await this._GeneroRepository.createQueryBuilder("gender")
      .leftJoin("gender.productores", "productor")
      .addSelect("COUNT(gender.id)", "sum")
      .where("gender.id = :id", { id: 1 })
      .groupBy('gender.id')
      .getRawOne()

    genderCount.men.count = await this._GeneroRepository.createQueryBuilder("gender")
      .leftJoin("gender.productores", "productor")
      .addSelect("COUNT(gender.id)", "count")
      .where("gender.id = :id", { id: 2 })
      .groupBy('gender.id')
      .getRawOne()

    genderCount.woman.arraywoman = await this._ProducersRepository.find({
      where: { idGenero: 1 }
    })

    genderCount.men.arraymen = await this._ProducersRepository.find({
      where: { idGenero: 2 }
    })

    return genderCount

  }

  async getRelationship() {
    const relationship = await this._RelationshipRepository.createQueryBuilder('relation')
      .innerJoinAndSelect("relation.productores", "productor")
      .getMany()

    const relations = relationship.map((ship) => { return { ...ship, count: ship.productores.length } })

    return relations
  }

  async getProducerDate() {
    const producerDate = await this._ProducersRepository.createQueryBuilder("producer")
      .select(["producer.id", "producer.nombres", "producer.apellidos", "producer.dni", "producer.edad", "producer.telefono"])
      .addSelect(["etnia.nombre", "gender.nombre", "organizacion.nombre", "conflicto.nombre", "discapacitado.nombre", "parentesco.nombre", "productor.nombres"])
      .leftJoin("producer.idGenero2", "gender")
      .leftJoin("producer.idEtnia2", "etnia")
      .leftJoin("producer.idOrganizacion2", "organizacion")
      .leftJoin("producer.idConflicto2", "conflicto")
      .leftJoin("producer.idDiscapacitado2", "discapacitado")
      .leftJoin("producer.idProductor2", "productor")
      .innerJoin("producer.idParentesco2", "parentesco")
      .leftJoinAndSelect("producer.idCargoOrg2", "cargoOrg")
      .getMany()

    return producerDate
  }

  async getProducerUpdate() {
    const etnia = await this.GrupoEtnicoRepository.find({})
    const cargoOrg = await this.CargoOrgRepository.find({})
    const parentesco = await this.ParentescoRepository.find({})
    const discapacidad = await this.DiscapacidadRepository.find({})
    const conflicto = await this.ConflictoRepository.find({})
    const organizacion = await this.OrganizacionRepository.find({})
    const jefeFamily = await this._ProducersRepository.find({
      where: { idParentesco: 1 }
    })

    return { etnia, cargo: cargoOrg, parentesco, discapacidad, conflicto, organizacion, jefeFamily }
  }

  async getCoutCropsProducer() {
    return await this.cropRepository.createQueryBuilder()
      .select('count(Cultivo.id)', 'countCrops')
      .innerJoin('Cultivo.dniProductor2', 'Productor')
      .getRawOne();
  }

  async getCropsProducersProductiveLine() {
    const countCrops = await this.getCoutCropsProducer()
    const response = await this.cropRepository.createQueryBuilder()
      .select(['Cultivo.hectareas', 'Cultivo.fechaInicio'])
      .addSelect(['Productor.nombres', 'Productor.apellidos', 'Productor.dni', 'Productor.edad', 'Productor.telefono'])
      .addSelect(['Genero.nombre'])
      .addSelect(['Municipio.nombre'])
      .addSelect(['Vereda.nombre'])
      .addSelect(['LineaProductiva.nombre'])
      .addSelect(['CadenaProductiva.nombre'])
      .innerJoin('Cultivo.dniProductor2', 'Productor')
      .innerJoin('Productor.idGenero2', 'Genero')
      .innerJoin('Cultivo.idMunicipio2', 'Municipio')
      .innerJoin('Cultivo.idVereda2', 'Vereda')
      .innerJoin('Cultivo.idLineaProductiva2', 'LineaProductiva')
      .innerJoin('LineaProductiva.idCadenaProductiva2', 'CadenaProductiva')
      .getMany();

    return { countCrops, response }
  }

  async getProductorVictimsOrExcombatants() {
    const victimsProducurs = await this._ProducersRepository.createQueryBuilder()
      .select(['Productores.nombres', 'Productores.apellidos', 'Productores.dni', 'Productores.edad', 'Productores.telefono'])
      .addSelect(['Genero.nombre'])
      .addSelect(['Conflicto.nombre'])
      .innerJoin('Productores.cultivos2', 'Cultivo')
      .innerJoin('Productores.idGenero2', 'Genero')
      .innerJoin('Productores.idConflicto2', 'Conflicto')
      .where("Conflicto.nombre= 'Victima'")
      .getMany()

    const excombatantsProducurs = await this._ProducersRepository.createQueryBuilder()
      .select(['Productores.nombres', 'Productores.apellidos', 'Productores.dni', 'Productores.edad', 'Productores.telefono'])
      .addSelect(['Genero.nombre'])
      .addSelect(['Conflicto.nombre'])
      .leftJoin('Productores.cultivos2', 'Cultivo')
      .leftJoin('Productores.idGenero2', 'Genero')
      .leftJoin('Productores.idConflicto2', 'Conflicto')
      .where("Conflicto.nombre = 'Excombatiente'")
      .getMany()

    const notApplyProducurs = await this._ProducersRepository.createQueryBuilder()
      .select(['Productores.nombres', 'Productores.apellidos', 'Productores.dni', 'Productores.edad', 'Productores.telefono'])
      .addSelect(['Genero.nombre'])
      .addSelect(['Conflicto.nombre'])
      .innerJoin('Productores.cultivos2', 'Cultivo')
      .innerJoin('Productores.idGenero2', 'Genero')
      .innerJoin('Productores.idConflicto2', 'Conflicto')
      .where("Conflicto.nombre = 'No Aplica'")
      .getMany()

    return { victimsProducurs, excombatantsProducurs, notApplyProducurs }
  }

  async getAllDataProducurs() {
    return await this.cropRepository.createQueryBuilder()
      .select(['Cultivo.hectareas', 'Cultivo.fechaInicio'])
      .addSelect(['Productor.nombres', 'Productor.apellidos', 'Productor.dni', 'Productor.edad', 'Productor.telefono'])
      .addSelect(['Genero.nombre'])
      .addSelect(['organizacion.nombre', 'organizacion.descripcion', 'organizacion.contacto', 'organizacion.temaCapacitacion', 'organizacion.temaEmpresarial'])
      .addSelect(['Municipio.nombre'])
      .addSelect(['Vereda.nombre'])
      .addSelect(['LineaProductiva.nombre'])
      .addSelect(['CadenaProductiva.nombre'])
      .innerJoin('Cultivo.dniProductor2', 'Productor')
      .innerJoin('Productor.idOrganizacion2', 'organizacion')
      .innerJoin('Productor.idGenero2', 'Genero')
      .innerJoin('Cultivo.idMunicipio2', 'Municipio')
      .innerJoin('Cultivo.idVereda2', 'Vereda')
      .innerJoin('Cultivo.idLineaProductiva2', 'LineaProductiva')
      .innerJoin('LineaProductiva.idCadenaProductiva2', 'CadenaProductiva')
      .getMany();
  }

  async getProducerById(dni) {
    return await this._ProducersRepository.findOne(dni, {
      relations: ['idGenero2', 'idOrganizacion2', 'idConflicto2', 'idDiscapacitado2', 'idEtnia2', 'idParentesco2']
    })
  }

}
