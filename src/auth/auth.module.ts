import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpStrategy } from '../common/strategys/http.strategy';
import { ConfigService } from '../common/config/config.service';
import { Productores } from '../entities/Productores';
import { User } from '../entities/User';

@Module({
  imports: [
    JwtModule.register({
      secret: 'redadelco',
      signOptions: { expiresIn: '15d' },
    }),
    TypeOrmModule.forFeature([User, Productores]),
  ],
  controllers: [AuthController],
  providers: [AuthService, HttpStrategy,ConfigService],
})
export class AuthModule { }
