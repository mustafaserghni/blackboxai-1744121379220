import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Case } from '../entities/case.entity';
import { CaseEvent } from '../entities/case-event.entity';
import { CaseDeadline } from '../entities/case-deadline.entity';
import { CaseTeamMember } from '../entities/case-team-member.entity';
import { Party } from '../entities/party.entity';
import { 
  CaseResponseDto, 
  CaseListResponseDto, 
  PartyResponseDto, 
  CaseEventResponseDto, 
  CaseDeadlineResponseDto, 
  CaseTeamMemberResponseDto, 
  ClientResponseDto 
} from '../dto/case-response.dto';

@Injectable()
export class CaseTransformer {
  toResponseDto(caseEntity: Case): CaseResponseDto {
    const dto = plainToInstance(CaseResponseDto, {
      ...caseEntity,
      client: this.toClientResponseDto(caseEntity.client),
      parties: caseEntity.parties?.map(party => this.toPartyResponseDto(party)) || [],
      events: caseEntity.events?.map(event => this.toEventResponseDto(event)) || [],
      deadlines: caseEntity.deadlines?.map(deadline => this.toDeadlineResponseDto(deadline)) || [],
      teamMembers: caseEntity.teamMembers?.map(member => this.toTeamMemberResponseDto(member)) || [],
    });

    return dto;
  }

  toListResponseDto(caseEntity: Case): CaseListResponseDto {
    return plainToInstance(CaseListResponseDto, {
      ...caseEntity,
      client: this.toClientResponseDto(caseEntity.client),
    });
  }

  toListResponseDtoArray(cases: Case[]): CaseListResponseDto[] {
    return cases.map(caseEntity => this.toListResponseDto(caseEntity));
  }

  toClientResponseDto(client: any): ClientResponseDto {
    if (!client) return null;
    return plainToInstance(ClientResponseDto, client);
  }

  toPartyResponseDto(party: Party): PartyResponseDto {
    if (!party) return null;
    return plainToInstance(PartyResponseDto, party);
  }

  toEventResponseDto(event: CaseEvent): CaseEventResponseDto {
    if (!event) return null;
    return plainToInstance(CaseEventResponseDto, event);
  }

  toDeadlineResponseDto(deadline: CaseDeadline): CaseDeadlineResponseDto {
    if (!deadline) return null;
    return plainToInstance(CaseDeadlineResponseDto, deadline);
  }

  toTeamMemberResponseDto(member: CaseTeamMember): CaseTeamMemberResponseDto {
    if (!member) return null;
    return plainToInstance(CaseTeamMemberResponseDto, {
      id: member.id,
      role: member.role,
      userId: member.user?.id,
      userName: member.user ? `${member.user.firstName} ${member.user.lastName}` : null,
    });
  }
}
