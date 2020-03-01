import { Controller, UseGuards, Get, Post, Body } from '@nestjs/common';
import { CropsService } from './crops.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('crops')
export class CropsController {

  constructor(private readonly _CropsService: CropsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('producer')
  async getCropsProducer() {
    const genderCount = await this._CropsService.getCropsProducer();
    return genderCount;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('producer')
  async geDateCrop() {
    return await this._CropsService.geDateCrop();
  }

  //@UseGuards(AuthGuard('jwt'))
  @Post()
  async createCrop(@Body() crop) {
    return await this._CropsService.createCrop(crop)
  }
}
