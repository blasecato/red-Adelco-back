import { Controller, Get, Post, Body, Put, Query } from '@nestjs/common';
import { CreateKitDto } from './dto/createKit.dto';
import { CreateAftDto } from './dto/createAft.dto';
import { ProducersService } from './producers.service';
import { CreateProducerBeneficiaryDto } from './dto/createproducerbeneficiary.dto';
import { UpdateProducerBeneficiaryDto } from './dto/updateProducerBeneficiary.dto';

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
  async updateProducer(@Body() updateProducer) {
    const producerUpdate = await this._ProducersService.updateProducer(updateProducer)
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

  @Get('get-kits')
  async getKits(@Query('idproducer') idProducer: string, @Query('dni') dni: number) {
    return await this._ProducersService.getKits(idProducer, dni);
  }

  @Get('get-kit')
  async getKit() {
    return await this._ProducersService.getKit();
  }

  @Get('get/all/kit-user')
  async getKitUser() {
    return await this._ProducersService.getKitUser();
  }

  @Get('get/kit-user')
  async getKitUserId(@Query('idproducer') idProducerId: string) {
    return await this._ProducersService.getKitUserId(idProducerId);
  }

  @Get('get-type-tool')
  async getAllTypeTool() {
    return await this._ProducersService.getAllTypeTool();
  }

  @Post('create-kit-tool')
  async createKitTool(@Body() body: CreateKitDto) {
    return await this._ProducersService.createKitTool(body);
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
