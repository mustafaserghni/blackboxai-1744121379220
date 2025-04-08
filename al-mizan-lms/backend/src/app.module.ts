import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

// Import feature modules
import { CaseManagementModule } from './modules/case-management/case-management.module';
import { DocumentManagementModule } from './modules/document-management/document-management.module';
import { BillingModule } from './modules/billing/billing.module';
import { CalendarModule } from './modules/calendar/calendar.module';
import { ClientPortalModule } from './modules/client-portal/client-portal.module';
import { AuthModule } from './modules/auth/auth.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    
    // PostgreSQL Database for structured data
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_DATABASE', 'al_mizan'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('DB_SYNC', false),
        logging: configService.get<boolean>('DB_LOGGING', false),
      }),
    }),
    
    // MongoDB for document metadata and flexible structures
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI', 'mongodb://localhost:27017/al_mizan'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    
    // Feature modules
    CaseManagementModule,
    DocumentManagementModule,
    BillingModule,
    CalendarModule,
    ClientPortalModule,
    AuthModule,
    AiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
