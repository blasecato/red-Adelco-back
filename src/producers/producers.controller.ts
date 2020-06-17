import { Controller, UseGuards, Get, Post, Body, Put, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ProducersService } from './producers.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateProducerBeneficiaryDto } from './dto/createproducerbeneficiary.dto';
import { CreateKitDto } from './dto/createKit.dto';
import { CreateAftDto } from './dto/createAft.dto';
import { UpdateProducerBeneficiaryDto } from './dto/updateProducerBeneficiary.dto';

@Controller('producers')
export class ProducersController {

  constructor(private readonly _ProducersService: ProducersService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createProducers(@Body() signupProducer) {
    const producer = await this._ProducersService.createProducers(signupProducer);
    return producer;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getProducersAll() {
    const producers = await this._ProducersService.getProducersAll();
    return producers;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('genderCount')
  async getProducerGender() {
    const genderCount = await this._ProducersService.getProducerGender();
    return genderCount;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('relationship')
  async getRelationship() {
    const relationship = await this._ProducersService.getRelationship();
    return relationship;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('producer-date')
  async getProducerDate() {
    const producerDate = await this._ProducersService.getProducerDate();
    return producerDate;
  }

  //@UseGuards(AuthGuard('jwt'))
  @Put('update')
  async updateProducer(@Body() updateProducer) {
    const producerUpdate = await this._ProducersService.updateProducer(updateProducer)
    return producerUpdate
  }

  //@UseGuards(AuthGuard('jwt'))
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
