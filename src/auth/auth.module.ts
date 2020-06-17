import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/userlogin.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { CommonModule } from '../common/common.module';
import { ConfigService } from '../common/config/config.service';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [CommonModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.jwt,
          signOptions: {
            expiresIn: 3600,
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
