import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndicadoresModule } from "./indicadores/indicadores.module";
import ConfigService from "./common/config/config.service";
import { UserModule } from "./user/userLogin.module";
import { AuthModule } from './auth/auth.module';
import { ProducersModule } from './producers/producers.module';
import { GenderModule } from './gender/gender.module';
import { RelationshipModule } from './relationship/relationship.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigService.orm_config),
    IndicadoresModule,
    UserModule,
    AuthModule,
    ProducersModule,
    GenderModule,
    RelationshipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
