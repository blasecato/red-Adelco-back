import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProducerBeneficiaryDto } from './dto/createproducerbeneficiary.dto';
import { UpdateProducerBeneficiaryDto } from './dto/updateProducerBeneficiary.dto';
import { CreateAftDto } from './dto/createAft.dto';
import { CreateKitDto } from './dto/createKit.dto';
import { ProductoresBeneficio } from '../entities/ProductoresBeneficio';
import { TipoHerramienta } from '../entities/TipoHerramienta';
import { KitHerramienta } from '../entities/KitHerramienta';
import { Organizacion } from '../entities/Organizacion';
import { Discapacidad } from '../entities/Discapacidad';
import { Productores } from '../entities/Productores';
import { Herramienta } from '../entities/Herramienta';
import { GrupoEtnico } from '../entities/GrupoEtnico';
import { Parentesco } from '../entities/Parentesco';
import { Conflicto } from '../entities/Conflicto';
import { CargoOrg } from '../entities/CargoOrg';
import { Cultivo } from '../entities/Cultivo';
import { KitUser } from '../entities/KitUser';
import { Genero } from '../entities/Genero';
import { Kit } from '../entities/Kit';
import { Aft } from '../entities/Aft';
import { CreateTypeToolDto } from './dto/createTypeTool.dto';
import { UpdateTypeToolDto } from './dto/updateTypeTool.dto';
import { UpdateProducerDto } from './dto/UpdateProducer.dto';

@Injectable()
export class ProducersService {

  constructor(
    @InjectRepository(Productores) private readonly _ProducersRepository: Repository<Productores>,
    @InjectRepository(Genero) private readonly _GeneroRepository: Repository<Genero>,
    @InjectRepository(Parentesco) private readonly _RelationshipRepository: Repository<Parentesco>,
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
    @InjectRepository(Aft) private readonly aftRepository: Repository<Aft>,

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

  async updateProducer(body: UpdateProducerDto) {
    const producerExists = await this._ProducersRepository.findOne({ where: { dni: body.dni } });

    if (!producerExists)
      return { error: 'PRODUCER_NOT_EXIST', detail: 'El productor no existe!' }

    try {
      await this._ProducersRepository.update(producerExists.dni, {
        id: body.id,
        nombres: body.nombres,
        apellidos: body.apellidos,
        edad: body.edad,
        telefono: body.telefono,
        state: body.state,
        entidad:body.entidad,
        idZona: {id:body.idZona},
        idGenero: { id: body.idGenero },
        idProductor: { id: body.idProductor },
        idConflicto: { id: body.idConflicto },
        idFinca: { id: body.idFinca },
        idParentesco: { id: body.idParentesco },
        idCargoOrg: { id: body.idCargoOrg }
      });

      return { success: 'OK' }
    } catch (err) {
      return err
    }
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
    return await this._ProducersRepository.createQueryBuilder("producer")
      .leftJoinAndSelect("producer.idGenero", "gender")
      .leftJoinAndSelect("producer.idEtnia", "etnia")
      .leftJoinAndSelect("producer.productoresOrganizaciones", "productoresOrganizaciones")
      .leftJoinAndSelect("productoresOrganizaciones.idOrganizacion", "organizacion")
      .leftJoinAndSelect("producer.idConflicto", "conflicto")
      .leftJoinAndSelect("producer.idDiscapacitado", "discapacitado")
      .leftJoinAndSelect("producer.idProductor", "productor")
      .leftJoinAndSelect("producer.idParentesco", "parentesco")
      .leftJoinAndSelect("producer.idCargoOrg", "cargoOrg")
      .getMany()
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
      .innerJoin('Productor.idGenero', 'Genero')
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
      .innerJoin('Productores.idGenero', 'Genero')
      .innerJoin('Productores.idConflicto', 'Conflicto')
      .where("Conflicto.nombre= 'Victima'")
      .getMany()

    const excombatantsProducurs = await this._ProducersRepository.createQueryBuilder()
      .select(['Productores.nombres', 'Productores.apellidos', 'Productores.dni', 'Productores.edad', 'Productores.telefono'])
      .addSelect(['Genero.nombre'])
      .addSelect(['Conflicto.nombre'])
      .leftJoin('Productores.cultivos2', 'Cultivo')
      .leftJoin('Productores.idGenero', 'Genero')
      .leftJoin('Productores.idConflicto', 'Conflicto')
      .where("Conflicto.nombre = 'Excombatiente'")
      .getMany()

    const notApplyProducurs = await this._ProducersRepository.createQueryBuilder()
      .select(['Productores.nombres', 'Productores.apellidos', 'Productores.dni', 'Productores.edad', 'Productores.telefono'])
      .addSelect(['Genero.nombre'])
      .addSelect(['Conflicto.nombre'])
      .innerJoin('Productores.cultivos2', 'Cultivo')
      .innerJoin('Productores.idGenero', 'Genero')
      .innerJoin('Productores.idConflicto', 'Conflicto')
      .where("Conflicto.nombre = 'No Aplica'")
      .getMany()

    return { victimsProducurs, excombatantsProducurs, notApplyProducurs }
  }

  async getAllDataProducurs() {
    return await this.cropRepository.createQueryBuilder()
      .innerJoinAndSelect('Cultivo.dniProductor2', 'Productor')
      .innerJoinAndSelect('Productor.productoresOrganizaciones', 'productoresOrganizaciones')
      .innerJoinAndSelect('productoresOrganizaciones.idOrganizacion', 'idOrganizacion')
      .innerJoinAndSelect('Productor.idGenero', 'Genero')
      .innerJoinAndSelect('Cultivo.idMunicipio2', 'Municipio')
      .innerJoinAndSelect('Cultivo.idVereda2', 'Vereda')
      .innerJoinAndSelect('Cultivo.idLineaProductiva2', 'LineaProductiva')
      .innerJoinAndSelect('LineaProductiva.idCadenaProductiva2', 'CadenaProductiva')
      .getMany();
  }

  async getProducerById(id, dni) {
    return await this._ProducersRepository.findOne({
      relations: ['idGenero', 'productoresOrganizaciones', 'productoresOrganizaciones.idOrganizacion', 'idConflicto', 'idDiscapacitado',
        'idEtnia', 'idParentesco', 'productoresBeneficios', 'productoresBeneficios.idBeneficio2',
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
        idBeneficiary2:{id:body.idBeneficiary},
        idProductor: { id: producer.id }
      })
      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async updateProducerBeneficiary(body: UpdateProducerBeneficiaryDto) {
    const producer = await this._ProducersRepository.findOne({
      select: ['id', 'nombres', 'dni'],
      where: { id: body.idProductor }
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
        idProductor: { id: producer.id }, idBeneficio2: { id: body.idBeneficio2 }

      })
      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async getAllKitsProducer() {
    return await this.kitRepository.createQueryBuilder()
      .innerJoinAndSelect('Kit.kitUsers', 'kitUsers')
      .innerJoinAndSelect('kitUsers.idProductor', 'idProductor')
      .leftJoinAndSelect('kitUsers.idKitHerramienta2', 'idKitHerramienta2')
      .leftJoinAndSelect('idKitHerramienta2.idHerramienta2', 'idHerramienta2')
      .leftJoinAndSelect('idHerramienta2.tipoHerramienta', 'tipoHerramienta')
      .getMany();
  }

  async getKit() {
    return await this.kitRepository.find({});
  }

  async createKitTool(body: CreateKitDto) {
    const producer = await this._ProducersRepository.findOne({
      select: ['id', 'nombres', 'dni'],
      where: { id: body.idProducer }
    });

    const typeTool = await this.typeToolRepository.findOne({ where: { id: body.typeTool } })

    if (!producer)
      return { error: 'PRODUCER_NOT_EXIST', detail: 'El productor no se encuentra en la base de datos.' }
    if (!typeTool)
      return { error: 'TYPE_TOOL_NOT_EXIST', detail: 'El tipo de herramienta no se encuentra en la base de datos.' }

    try {
      const kit = await this.kitRepository.save({
        nombre: body.kitName, imageActa: body.imagenActa
      });

      const tool = await this.toolRepository.save({
        descripcion: body.toolDetail, tipoHerramienta: { id: typeTool.id }
      });

      const kitTool = await this.kitToolRepository.save({
        idHerramienta2: { id: tool.id }, idKit2: { id: kit.id }
      });

      await this.kitUserRepository.save({
        idProductor: { id: body.idProducer }, idKitHerramienta2: { id: kitTool.id }, idKit2: { id: kit.id }
      });

      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async createTypeTool(body: CreateTypeToolDto) {
    try {
      await this.typeToolRepository.save({ ...body });
      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async updateTypeTool(body: UpdateTypeToolDto) {
    const typeTool = await this.typeToolRepository.findOne({ where: { id: body.id } });

    if (!typeTool)
      return { error: 'TYPE_TOOL_NOT_EXIST', detail: 'El tipo de herramienta no existe!' }

    try {
      await this.typeToolRepository.update(typeTool.id, { ...body });

      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async getAllTypeTool() {
    return await this.typeToolRepository.find({});
  }

  async createKit(body: CreateKitDto) {
    try {
      await this.kitRepository.save({
        nombre: body.kitName, imageActa: body.imagenActa
      });
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
        idProductor: { id: producer.id }, idKit2: { id: kit.id }
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
        idProductor: { dni: body.producerDni }
      })

      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }

  async getAllAft() {
    return await this.aftRepository.find({ relations: ['idOrganizacion2'] });
  }

  async getKitProducerDni(dni: number) {
    return await this._ProducersRepository.find({
      relations: ['kitUsers', 'kitUsers.idKit2', 'kitUsers.idKitHerramienta2', 'kitUsers.idKitHerramienta2.idHerramienta2',
        'kitUsers.idKitHerramienta2.idHerramienta2.tipoHerramienta'],
      where: { dni }
    })
  }
}