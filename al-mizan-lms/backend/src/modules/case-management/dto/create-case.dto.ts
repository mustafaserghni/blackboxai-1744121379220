import { IsString, IsEnum, IsOptional, IsUUID, IsDate, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CaseStatus, CasePriority } from '../entities/case.entity';
import { Type } from 'class-transformer';

export class CreateCaseDto {
  @ApiProperty({ description: 'Case number or reference', example: 'CASE-2023-001' })
  @IsString()
  @IsNotEmpty()
  caseNumber: string;

  @ApiProperty({ description: 'Case title in English', example: 'Smith vs. Johnson' })
  @IsString()
  @IsNotEmpty()
  titleEn: string;

  @ApiPropertyOptional({ description: 'Case title in Arabic' })
  @IsString()
  @IsOptional()
  titleAr?: string;

  @ApiPropertyOptional({ description: 'Case title in French' })
  @IsString()
  @IsOptional()
  titleFr?: string;

  @ApiProperty({ 
    description: 'Case status', 
    enum: CaseStatus,
    default: CaseStatus.ACTIVE,
    example: CaseStatus.ACTIVE
  })
  @IsEnum(CaseStatus)
  @IsOptional()
  status?: CaseStatus;

  @ApiProperty({ 
    description: 'Case priority', 
    enum: CasePriority,
    default: CasePriority.MEDIUM,
    example: CasePriority.MEDIUM
  })
  @IsEnum(CasePriority)
  @IsOptional()
  priority?: CasePriority;

  @ApiPropertyOptional({ description: 'Case description in English' })
  @IsString()
  @IsOptional()
  descriptionEn?: string;

  @ApiPropertyOptional({ description: 'Case description in Arabic' })
  @IsString()
  @IsOptional()
  descriptionAr?: string;

  @ApiPropertyOptional({ description: 'Case description in French' })
  @IsString()
  @IsOptional()
  descriptionFr?: string;

  @ApiPropertyOptional({ description: 'Type of case', example: 'Civil' })
  @IsString()
  @IsOptional()
  caseType?: string;

  @ApiPropertyOptional({ description: 'Jurisdiction', example: 'Dubai Courts' })
  @IsString()
  @IsOptional()
  jurisdiction?: string;

  @ApiPropertyOptional({ description: 'Court name', example: 'Dubai Civil Court' })
  @IsString()
  @IsOptional()
  court?: string;

  @ApiPropertyOptional({ description: 'Judge name', example: 'Judge Ahmed' })
  @IsString()
  @IsOptional()
  judge?: string;

  @ApiPropertyOptional({ description: 'Filing date', example: '2023-01-15' })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  filingDate?: Date;

  @ApiPropertyOptional({ description: 'Closing date', example: '2023-06-30' })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  closingDate?: Date;

  @ApiProperty({ description: 'Client ID', example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  @IsNotEmpty()
  clientId: string;
}
