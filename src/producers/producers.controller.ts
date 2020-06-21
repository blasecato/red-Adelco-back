import { Controller, Get, Post, Body, Put, Query } from '@nestjs/common';
import { CreateKitDto } from './dto/createKit.dto';
import { CreateAftDto } from './dto/createAft.dto';
import { ProducersService } from './producers.service';
import { CreateProducerBeneficiaryDto } from './dto/createproducerbeneficiary.dto';
import { UpdateProducerBeneficiaryDto } from './dto/updateProducerBeneficiary.dto';
import { CreateTypeToolDto } from './dto/createTypeTool.dto';
import { UpdateTypeToolDto } from './dto/updateTypeTool.dto';
import { UpdateProducerDto } from './dto/UpdateProducer.dto';

@Controller('producers')
export class ProducersController {

  constructor(private readonly _ProducersService: ProducersService) { }

  @Post('create')
  async createProducers(@Body() body) {
    return await this._ProducersService.createProducers(body);
  }

  @Get()
  async getProducersAll() {
    const producers = await this._ProducersService.getProducersAll();
    return producers;
  }

  @Get('genderCount')
  async getProducerGender() {
    const genderCount = await this._ProducersService.getProducerGender();
    return genderCount;
  }

  @Get('relationship')
  async getRelationship() {
    const relationship = await this._ProducersService.getRelationship();
    return relationship;
  }

  @Get('producer-date')
  async getProducerDate() {
    return await this._ProducersService.getProducerDate();
  }

  @Put('update')
  async updateProducer(@Body() body:UpdateProducerDto) {
    const producerUpdate = await this._ProducersService.updateProducer(body)
    return producerUpdate
  }

  @Get('date-update')
  async DateUpdateProducer() {
    const producerUpdate = await this._ProducersService.getProducerUpdate()
    return producerUpdate
  }

  @Get('get/count-crops/productiveline')
  async getCropsProducersProductiveLine() {
    return await this._ProducersService.getCropsProducersProductiveLine();
  }

  @Get('get/excombatant-victims')
  async getProductorVictimsOrExcombatants() {
    return await this._ProducersService.getProductorVictimsOrExcombatants();
  }

  @Get('get/producurs-organization')
  async getAllDataProducurs() {
    return await this._ProducersService.getAllDataProducurs();
  }

  @Get('get-by')
  async getProducerById(@Query('id') id: string, @Query('dni') dni: number) {
    return await this._ProducersService.getProducerById(id, dni);
  }

  @Post('create-producer-beneficiary')
  async createProducerBeneficiary(@Body() body: CreateProducerBeneficiaryDto) {
    return await this._ProducersService.createProducerBeneficiary(body);
  }

  @Put('update/producer-beneficiary')
  async updateProducerBeneficiary(@Body() body: UpdateProducerBeneficiaryDto) {
    return await this._ProducersService.updateProducerBeneficiary(body);
  }

  @Get('get/all/kit-producer')
  async getAllKitsProducer() {
    return await this._ProducersService.getAllKitsProducer();
  } 

  @Get('get/kits/by/producer')
  async getKitUserId(@Query('dni') dni: number) {
    return await this._ProducersService.getKitProducerDni(dni);
  }

  @Get('get/kit-all')
  async getKit() {
    return await this._ProducersService.getKit();
  }

  @Get('get-type-tool')
  async getAllTypeTool() {
    return await this._ProducersService.getAllTypeTool();
  } 

  @Post('create-kit-tool')
  async createKitTool(@Body() body: CreateKitDto) {
    return await this._ProducersService.createKitTool(body);
  }

  @Post('create/type-tool')
  async createTypeTool(@Body() body: CreateTypeToolDto) {
    return await this._ProducersService.createTypeTool(body);
  }

  @Put('update/type-tool')
  async updateTypeTool(@Body() body: UpdateTypeToolDto) {
    return await this._ProducersService.updateTypeTool(body);
  }

  @Post('create-kit')
  async createKit(@Body() body: CreateKitDto) {
    return await this._ProducersService.createKit(body);
  }

  @Post('create/kit-user')
  async createKitUser(@Body() body: CreateKitDto) {
    return await this._ProducersService.createKitUser(body);
  }

  @Post('create-aft')
  async createAft(@Body() body: CreateAftDto) {
    return await this._ProducersService.createAft(body);
  }

  @Get('get-aft/organization')
  async getAllAft() {
    return await this._ProducersService.getAllAft();
  }
}
