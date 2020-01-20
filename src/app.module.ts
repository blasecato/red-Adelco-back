import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndicadoresModule } from "./indicadores/indicadores.module";
import  ConfigService  from "./common/config/config.service";


@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigService.orm_config),
  IndicadoresModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
