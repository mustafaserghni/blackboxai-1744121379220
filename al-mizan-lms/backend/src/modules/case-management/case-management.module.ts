import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseManagementController } from './case-management.controller';
import { CaseManagementService } from './case-management.service';
import { CaseTransformer } from './transformers/case.transformer';
import { Case } from './entities/case.entity';
import { Client } from './entities/client.entity';
import { Party } from './entities/party.entity';
import { CaseEvent } from './entities/case-event.entity';
import { CaseDeadline } from './entities/case-deadline.entity';
import { CaseTeamMember } from './entities/case-team-member.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Case,
      Client,
      Party,
      CaseEvent,
      CaseDeadline,
      CaseTeamMember,
      User,
    ]),
  ],
  controllers: [CaseManagementController],
  providers: [CaseManagementService, CaseTransformer],
  exports: [CaseManagementService],
})
export class CaseManagementModule {}
