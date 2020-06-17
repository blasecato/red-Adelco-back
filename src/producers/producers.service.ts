import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProducersRepository } from './producers.repository';
import { GeneroRepository } from '../gender/gender.repository';
import { Discapacidad } from '../entities/Discapacidad';
import { Organizacion } from '../entities/Organizacion';
import { Productores } from '../entities/Productores';
import { GrupoEtnico } from '../entities/GrupoEtnico';
import { Parentesco } from '../entities/Parentesco';
import { Conflicto } from '../entities/Conflicto';
import { CargoOrg } from '../entities/CargoOrg';
import { Cultivo } from '../entities/Cultivo';
import { RelationshipRepository } from '../relationship/relationship.repository';
import { CreateProducerBeneficiaryDto } from './dto/createproducerbeneficiary.dto';
import { ProductoresBeneficio } from '../entities/ProductoresBeneficio';
import { Kit } from '../entities/Kit';
import { CreateKitDto } from './dto/createKit.dto';
import { Herramienta } from '../entities/Herramienta';
import { TipoHerramienta } from '../entities/TipoHerramienta';
import { KitHerramienta } from '../entities/KitHerramienta';
import { KitUser } from '../entities/KitUser';
import { CreateAftDto } from './dto/createAft.dto';
import { Aft } from '../entities/Aft';
import { UpdateProducerBeneficiaryDto } from './dto/updateProducerBeneficiary.dto';

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
    @InjectRepository(Cultivo) private readonly cropRepository: Repository<Cultivo>,
    @InjectRepository(ProductoresBeneficio) private readonly productoresBeneficioRepository: Repository<ProductoresBeneficio>,
    @InjectRepository(Kit) private readonly kitRepository: Repository<Kit>,
    @InjectRepository(Herramienta) private readonly toolRepository: Repository<Herramienta>,
    @InjectRepository(TipoHerramienta) private readonly typeToolRepository: Repository<TipoHerramienta>,
    @InjectRepository(KitHerramienta) private readonly kitToolRepository: Repository<KitHerramienta>,
    @InjectRepository(KitUser) private readonly kitUserRepository: Repository<KitUser>,
    @InjectRepository(Aft) private readonly aftRepository: Repository<Aft>

  ) { }

  async createProducers(body) {

    const { id, nombres, apellidos, dni, idGenero, telefono, edad, idParentesco,
      idConflicto, idEtnia } = body

    const producerExists = await this._ProducersRepository.findOne({
      where: { dni },
    });

    if (producerExists) throw new ConflictException('dni already exists');

    const producer = new Productores();
    producer.id = id;
    producer.nombres = nombres;
    producer.apellidos = apellidos;
    producer.dni = dni;
    producer.idGenero = idGenero;
    producer.telefono = telefono;
    producer.edad = edad;
    producer.idParentesco = idParentesco;
    producer.idConflicto = idConflicto;
    producer.idEtnia = idEtnia;

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
      .leftJoin("producer.idParentesco2", "parentesco")
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
      .select(['Cultivo.hectareas', 'Cultivo.fechaInicio', 'Cultivo.posicionAcepta'])
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
      .select(['Cultivo.hectareas', 'Cultivo.fechaInicio', 'Cultivo.posicionAcepta'])
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

  async getProducerById(id, dni) {
    return await this._ProducersRepository.findOne({
      relations: ['idGenero2', 'idOrganizacion2', 'idConflicto2', 'idDiscapacitado2',
        'idEtnia2', 'idParentesco2', 'productoresBeneficios', 'productoresBeneficios.idBeneficio2',
        'productoresBeneficios.idBeneficio2.idTipoBeneficio2', 'kitUsers', 'kitUsers.idKitHerramienta2',
        'kitUsers.idKitHerramienta2.idKit2'],
      where: [{ id }, { dni }]
    })
  }

  /* Ojo */
  async createProducerBeneficiary(body: CreateProducerBeneficiaryDto) {
    const producer = await this._ProducersRepository.findOne({
      select: ['id', 'nombres', 'dni'],
      where: { id: body.idProducer, dni: body.dni }
    })

    if (!producer)
      return { error: 'PRODUCER_NOT_EXIST', detail: 'El productor no se encuentra en la base de datos.' }

    try {
      await this.productoresBeneficioRepository.save({
        ...body,
        idProductor2: { id: producer.id }
      })
      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async updateProducerBeneficiary(body: UpdateProducerBeneficiaryDto) {
    const producer = await this._ProducersRepository.findOne({
      select: ['id', 'nombres', 'dni'],
      where: { id: body.idProductor2 }
    })

    const producerBeneficiary = await this.productoresBeneficioRepository.findOne({
      select: ['id'],
      where: { id: body.id }
    })

    if (!producerBeneficiary)
      return { error: 'PRODUCER_BENEFICIARY_NOT_EXIST', detail: 'El productor no tiene ningun beneficio registrado.' }
    else if (!producer)
      return { error: 'PRODUCER_NOT_EXIST', detail: 'El productor no se encuentra en la base de datos.' }

    try {
      await this.productoresBeneficioRepository.update(producerBeneficiary.id, {
        ...body,
        idProductor2: { id: producer.id }, idBeneficio2: { id: body.idBeneficio2 }

      })
      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async getKits(idProducer: string, dni: number) {
    return await this.kitRepository.createQueryBuilder()
      .innerJoinAndSelect('Kit.kitHerramientas', 'kitHerramienta')
      .innerJoinAndSelect('kitHerramienta.idHerramienta2', 'Herramienta')
      .innerJoinAndSelect('Herramienta.idTipoHerramienta2', 'TipoHerramienta')
      .innerJoinAndSelect('kitHerramienta.kitUsers', 'kitUser')
      .innerJoinAndSelect('kitUser.idProductor2', 'Productor')
      .where('Productor.id =:idProducer OR Productor.dni =:dni', { idProducer, dni })
      .getMany();
  }

  async getKit() {
    return await this.kitRepository.find({})
  }

  async createKitTool(body: CreateKitDto) {
    const producer = await this._ProducersRepository.findOne({
      select: ['id', 'nombres', 'dni'],
      where: { id: body.idProducer }
    })

    if (!producer)
      return { error: 'PRODUCER_NOT_EXIST', detail: 'El productor no se encuentra en la base de datos.' }

    try {
      const kit = await this.kitRepository.save({
        nombre: body.kitName, imageActa: body.imagenActa
      })

      const tool = await this.toolRepository.save({
        descripcion: body.toolDetail, idTipoHerramienta2: { id: body.idTypeTool }
      })

      const kitTool = await this.kitToolRepository.save({
        idHerramienta2: { id: tool.id }, idKit2: { id: kit.id }
      })

      await this.kitUserRepository.save({
        idProductor2: { id: body.idProducer }, idKitHerramienta2: { id: kitTool.id }, idKit2: { id: kit.id }
      })

      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async getAllTypeTool() {
    return await this.typeToolRepository.find({})
  }

  async createKit(body: CreateKitDto) {
    try {
      await this.kitRepository.save({
        nombre: body.kitName, imageActa: body.imagenActa
      })
      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async createKitUser(body: CreateKitDto) {
    const producer = await this._ProducersRepository.findOne({
      select: ['id', 'nombres', 'dni'],
      where: { id: body.idProducer }
    })

    const kit = await this.kitRepository.findOne({
      select: ['id'],
      where: { id: body.idKit }
    })

    if (!producer)
      return { error: 'PRODUCER_NOT_EXIST', detail: 'El productor no se encuentra en la base de datos.' }
    else if (!kit)
      return { error: 'KIT_NOT_EXIST', detail: 'El Kit no se encuentra en la base de datos.' }

    try {
      await this.kitUserRepository.save({
        idProductor2: { id: producer.id }, idKit2: { id: kit.id }
      })

      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }


  async createAft(body: CreateAftDto) {
    const producer = await this._ProducersRepository.findOne({
      select: ['id', 'nombres', 'dni'],
      where: { dni: body.producerDni }
    })
    if (!producer)
      return { error: 'PRODUCER_NOT_EXIST', detail: 'El productor no se encuentra en la base de datos.' }

    try {
      await this.aftRepository.save({
        idOrganizacion2: { id: body.idOrganizacion },
        valorAft: body.valorAft,
        fechaEntrega: body.fechaEntrega,
        cuenta: body.cuenta,
        tipoCuenta: body.tipoCuenta,
        banco: body.banco,
        documento: body.documento,
        matricula: body.matricula,
        email: body.email,
        avances: body.avances,
        idMunicipio2: { id: body.idMunicipio },
        dv: body.dv,
        nit: body.nit,
        idProductor2: { dni: body.producerDni }
      })

      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async getAllAft() {
    return await this.aftRepository.find({ relations: ['idOrganizacion2'] });
  }

  async getKitUser() {
    return await this.kitRepository.createQueryBuilder()
      .innerJoinAndSelect('Kit.kitUsers', 'kitUsers')
      .innerJoinAndSelect('kitUsers.idProductor2', 'Productores')
      .getMany();
  }

  async getKitUserId(idProducerId: string) {
    return await this.kitRepository.createQueryBuilder()
      .innerJoinAndSelect('Kit.kitUsers', 'kitUsers')
      .innerJoinAndSelect('kitUsers.idProductor2', 'Productor')
      .where('Productor.id =: idProducerId ', { idProducerId })
      .getMany();
  }

}
