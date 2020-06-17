import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndicadoresModule } from "./indicadores/indicadores.module";
import { UserModule } from "./user/userlogin.module";
import { AuthModule } from './auth/auth.module';
import { ProducersModule } from './producers/producers.module';
import { CropsModule } from './crops/crops.module';
import { OrganizationModule } from './organization/organization.module';
import { CadenasProductivasModule } from './cadenas-productivas/cadenas-productivas.module';
import { InfrastructuresModule } from './infrastructures/infrastructures.module';
import { MunicipalityModule } from './municipality/municipality.module';
import ConfigService from './common/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigService.orm_config),
    IndicadoresModule,
    UserModule,
    AuthModule,
    ProducersModule,
    CropsModule,
    OrganizationModule,
    CadenasProductivasModule,
    InfrastructuresModule,
    MunicipalityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
