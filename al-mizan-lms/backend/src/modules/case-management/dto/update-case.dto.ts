import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCaseDto } from './create-case.dto';

// We extend PartialType to make all fields optional for updates
// We omit caseNumber since it shouldn't be updated after creation
export class UpdateCaseDto extends PartialType(
  OmitType(CreateCaseDto, ['caseNumber'] as const),
) {}
