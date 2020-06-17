import { Controller, UseGuards, Get, Body, Post, Put, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CropsService } from './crops.service';
import { UpdateCropDto } from './dto/updateCrop.dto';
import { CreateCropDto } from './dto/createCrop.dto';
import { CreateAcceptDto } from './dto/createAccept.dto';
import { CreateDiagnosticDto } from './dto/createDiagnostic.dto';

@Controller('crops')
export class CropsController {

  constructor(private readonly _CropsService: CropsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('producer')
  async getCropsProducer() {
    const genderCount = await this._CropsService.getCropsProducer();
    return genderCount;
  }

  
  @Get('date-crop')
  async geDateCrop() {
    return await this._CropsService.geDateCrop();
  }

  @Post('/create')
  async createCrop(@Body() body: CreateCropDto) {
    return await this._CropsService.createCrop(body)
  }

  @Put('/update')
  async updateCrop(@Body() body: UpdateCropDto) {
    return await this._CropsService.updateCrop(body)
  }

  @Get('quantity/productive-line')
  async getCountCropsLineProducter(@Query('productivelineId') productivelineId: number) {
    return await this._CropsService.getCountCropsLineProducter(productivelineId);
  }

  @Post('create-accept')
  async createAccept(@Body() body: CreateAcceptDto) {
    return await this._CropsService.createAccept(body);
  }

  @Post('create-diagnostic')
  async createDiagnostic(@Body() body: CreateDiagnosticDto) {
    return await this._CropsService.createDiagnostic(body)
  }

  @Get('get/crops-diagnostic')
  async getCropsDiagnosticAll() {
    return await this._CropsService.getCropsDiagnosticAll();
  }
}
