import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProducersRepository } from './producers.repository';
import { Productores } from 'src/entities/Productores';
import { GeneroRepository } from 'src/gender/gender.repository';
import { RelationshipRepository } from 'src/relationship/relationship.repository';
import { GrupoEtnico } from 'src/entities/GrupoEtnico';
import { Repository } from 'typeorm';
import { Cargo } from 'src/entities/Cargo';
import { Parentesco } from 'src/entities/Parentesco';
import { Discapacidad } from 'src/entities/Discapacidad';
import { Conflicto } from 'src/entities/Conflicto';
import { Organizacion } from 'src/entities/Organizacion';
import { CargoOrg } from 'src/entities/CargoOrg';

@Injectable()
export class ProducersService {

  constructor(
    @InjectRepository(ProducersRepository)
    private readonly _ProducersRepository: ProducersRepository,
    @InjectRepository(GeneroRepository)
    private readonly _GeneroRepository: GeneroRepository,
    @InjectRepository(RelationshipRepository)
    private readonly _RelationshipRepository: RelationshipRepository,
    @InjectRepository(GrupoEtnico)
    private readonly GrupoEtnicoRepository: Repository<GrupoEtnico>,
    @InjectRepository(CargoOrg)
    private readonly CargoOrgRepository: Repository<CargoOrg>,
    @InjectRepository(Parentesco)
    private readonly ParentescoRepository: Repository<Parentesco>,
    @InjectRepository(Discapacidad)
    private readonly DiscapacidadRepository: Repository<Discapacidad>,
    @InjectRepository(Conflicto)
    private readonly ConflictoRepository: Repository<Conflicto>,
    @InjectRepository(Organizacion)
    private readonly OrganizacionRepository: Repository<Organizacion>,
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

}
