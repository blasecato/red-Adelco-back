import { Controller, UseGuards, Get, Post, Body, Put, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ProducersService } from './producers.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateProducerBeneficiaryDto } from './dto/createproducerbeneficiary.dto';

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

  @Get('get-by-id/:id')
  async getProducerById(@Param('id', ParseIntPipe) id: number) {
    return await this._ProducersService.getProducerById(id);
  }

  @Post('create-Producer-Beneficial')
  async createProducerBeneficiary(@Body() body: CreateProducerBeneficiaryDto) {
    return await this._ProducersService.createProducerBeneficiary(body);
  }
}
