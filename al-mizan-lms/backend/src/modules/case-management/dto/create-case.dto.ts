import { IsString, IsEnum, IsOptional, IsDate, IsUUID, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CaseStatus, CasePriority } from '../entities/case.entity';
import { PartyType, PartyRole } from '../entities/party.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePartyDto {
  @ApiProperty({ description: 'Party type (plaintiff, defendant, etc.)' })
  @IsEnum(PartyType)
  type: PartyType;

  @ApiProperty({ description: 'Party role in the case' })
  @IsEnum(PartyRole)
  role: PartyRole;

  @ApiProperty({ description: 'Party name in English' })
  @IsString()
  @Length(1, 255)
  nameEn: string;

  @ApiPropertyOptional({ description: 'Party name in Arabic' })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  nameAr?: string;

  @ApiPropertyOptional({ description: 'Party name in French' })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  nameFr?: string;

  @ApiPropertyOptional({ description: 'Party representative' })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  representative?: string;

  @ApiPropertyOptional({ description: 'Party email address' })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  email?: string;

  @ApiPropertyOptional({ description: 'Party phone number' })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  phone?: string;

  @ApiPropertyOptional({ description: 'Party address' })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  address?: string;
}

export class CreateCaseDto {
  @ApiProperty({ description: 'Case number (unique identifier)' })
  @IsString()
  @Length(1, 100)
  caseNumber: string;

  @ApiProperty({ description: 'Case title in English' })
  @IsString()
  @Length(1, 255)
  titleEn: string;

  @ApiPropertyOptional({ description: 'Case title in Arabic' })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  titleAr?: string;

  @ApiPropertyOptional({ description: 'Case title in French' })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  titleFr?: string;

  @ApiProperty({ description: 'Case status', enum: CaseStatus })
  @IsEnum(CaseStatus)
  status: CaseStatus;

  @ApiProperty({ description: 'Case priority', enum: CasePriority })
  @IsEnum(CasePriority)
  priority: CasePriority;

  @ApiPropertyOptional({ description: 'Case description in English' })
  @IsOptional()
  @IsString()
  descriptionEn?: string;

  @ApiPropertyOptional({ description: 'Case description in Arabic' })
  @IsOptional()
  @IsString()
  descriptionAr?: string;

  @ApiPropertyOptional({ description: 'Case description in French' })
  @IsOptional()
  @IsString()
  descriptionFr?: string;

  @ApiPropertyOptional({ description: 'Type of case' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  caseType?: string;

  @ApiPropertyOptional({ description: 'Jurisdiction where the case is filed' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  jurisdiction?: string;

  @ApiPropertyOptional({ description: 'Court where the case is filed' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  court?: string;

  @ApiPropertyOptional({ description: 'Judge assigned to the case' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  judge?: string;

  @ApiPropertyOptional({ description: 'Date when the case was filed' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  filingDate?: Date;

  @ApiProperty({ description: 'Client ID associated with the case' })
  @IsUUID()
  clientId: string;

  @ApiPropertyOptional({ description: 'Initial parties involved in the case' })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePartyDto)
  parties?: CreatePartyDto[];
}
