import { Controller, UseGuards, Get, Body, Post, Put } from '@nestjs/common';
import { CropsService } from './crops.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCropDto } from './dto/updateCrop.dto';
import { CreateCropDto } from './dto/createCrop.dto';

@Controller('crops')
export class CropsController {

  constructor(private readonly _CropsService: CropsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('producer')
  async getCropsProducer() {
    const genderCount = await this._CropsService.getCropsProducer();
    return genderCount;
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get('date-crop')
  async geDateCrop() {
    return await this._CropsService.geDateCrop();
  }
  
  //@UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createCrop(@Body() body:CreateCropDto) {
    console.log(body);
    return await this._CropsService.createCrop(body)
  }

  @Put('update')
  async updateCrop(@Body() body: UpdateCropDto) {
    return await this._CropsService.updateCrop(body)
  }

}
