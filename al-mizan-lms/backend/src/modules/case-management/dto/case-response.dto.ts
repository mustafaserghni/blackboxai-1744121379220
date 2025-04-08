import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CaseStatus, CasePriority } from '../entities/case.entity';
import { Type } from 'class-transformer';

export class ClientResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nameEn: string;

  @ApiPropertyOptional()
  nameAr?: string;

  @ApiPropertyOptional()
  nameFr?: string;

  @ApiProperty()
  type: string;

  @ApiPropertyOptional()
  email?: string;
}

export class PartyResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  nameEn: string;

  @ApiPropertyOptional()
  nameAr?: string;

  @ApiPropertyOptional()
  nameFr?: string;

  @ApiPropertyOptional()
  representative?: string;
}

export class CaseEventResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  dateTime: Date;

  @ApiProperty()
  descriptionEn: string;

  @ApiPropertyOptional()
  descriptionAr?: string;

  @ApiPropertyOptional()
  descriptionFr?: string;
}

export class CaseDeadlineResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  descriptionEn: string;

  @ApiPropertyOptional()
  descriptionAr?: string;

  @ApiPropertyOptional()
  descriptionFr?: string;

  @ApiProperty()
  status: string;
}

export class CaseTeamMemberResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  userName: string;
}

export class CaseResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  caseNumber: string;

  @ApiProperty()
  titleEn: string;

  @ApiPropertyOptional()
  titleAr?: string;

  @ApiPropertyOptional()
  titleFr?: string;

  @ApiProperty({ enum: CaseStatus })
  status: CaseStatus;

  @ApiProperty({ enum: CasePriority })
  priority: CasePriority;

  @ApiPropertyOptional()
  descriptionEn?: string;

  @ApiPropertyOptional()
  descriptionAr?: string;

  @ApiPropertyOptional()
  descriptionFr?: string;

  @ApiPropertyOptional()
  caseType?: string;

  @ApiPropertyOptional()
  jurisdiction?: string;

  @ApiPropertyOptional()
  court?: string;

  @ApiPropertyOptional()
  judge?: string;

  @ApiPropertyOptional()
  filingDate?: Date;

  @ApiPropertyOptional()
  closingDate?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: () => ClientResponseDto })
  @Type(() => ClientResponseDto)
  client: ClientResponseDto;

  @ApiProperty({ type: [PartyResponseDto] })
  @Type(() => PartyResponseDto)
  parties: PartyResponseDto[];

  @ApiProperty({ type: [CaseEventResponseDto] })
  @Type(() => CaseEventResponseDto)
  events: CaseEventResponseDto[];

  @ApiProperty({ type: [CaseDeadlineResponseDto] })
  @Type(() => CaseDeadlineResponseDto)
  deadlines: CaseDeadlineResponseDto[];

  @ApiProperty({ type: [CaseTeamMemberResponseDto] })
  @Type(() => CaseTeamMemberResponseDto)
  teamMembers: CaseTeamMemberResponseDto[];
}

export class CaseListResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  caseNumber: string;

  @ApiProperty()
  titleEn: string;

  @ApiPropertyOptional()
  titleAr?: string;

  @ApiPropertyOptional()
  titleFr?: string;

  @ApiProperty({ enum: CaseStatus })
  status: CaseStatus;

  @ApiProperty({ enum: CasePriority })
  priority: CasePriority;

  @ApiProperty({ type: () => ClientResponseDto })
  @Type(() => ClientResponseDto)
  client: ClientResponseDto;

  @ApiProperty()
  filingDate?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
