import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', // In production, use environment variable
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
