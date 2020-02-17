import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProducersRepository } from './producers.repository';
import { Productores } from 'src/entities/Productores';
import { GeneroRepository } from 'src/gender/gender.repository';
import { RelationshipRepository } from 'src/relationship/relationship.repository';

@Injectable()
export class ProducersService {

  constructor(
    @InjectRepository(ProducersRepository)
    private readonly _ProducersRepository: ProducersRepository,
    @InjectRepository(GeneroRepository)
    private readonly _GeneroRepository: GeneroRepository,
    @InjectRepository(RelationshipRepository)
    private readonly _RelationshipRepository: RelationshipRepository,
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

    const producers = await this._ProducersRepository.update(body.dni, {
      idOrganizacion: body.idOrganizacion,
      idEtnia: body.idEtnia,
      idCargoOrg: body.idCargoOrg,
      idZona: body.idZona,
      idConflicto: body.idConflicto,
      idParentesco: body.idParentesco,
    })

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
      .select(["producer.id", "producer.nombres","producer.apellidos", "producer.dni", "producer.dni", "producer.edad", "producer.telefono"])
      .addSelect(["etnia.nombre", "gender.nombre", "organizacion.nombre", "conflicto.nombre", "discapacitado.nombre", "parentesco.nombre"])
      .innerJoin("producer.idGenero2", "gender")
      .innerJoin("producer.idEtnia2", "etnia")
      .innerJoin("producer.idOrganizacion2", "organizacion")
      .innerJoin("producer.idConflicto2", "conflicto")
      .innerJoin("producer.idDiscapacitado2", "discapacitado")
      .innerJoin("producer.idParentesco2", "parentesco")
      .getMany()

    return producerDate
  }

}
