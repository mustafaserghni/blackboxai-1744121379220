import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Case } from './entities/case.entity';
import { Client } from './entities/client.entity';
import { Party } from './entities/party.entity';
import { CaseEvent } from './entities/case-event.entity';
import { CaseDeadline } from './entities/case-deadline.entity';
import { CaseTeamMember } from './entities/case-team-member.entity';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { CaseResponseDto, CaseListResponseDto, CaseEventResponseDto, CaseDeadlineResponseDto, CaseTeamMemberResponseDto, PartyResponseDto } from './dto/case-response.dto';
import { CaseTransformer } from './transformers/case.transformer';

@Injectable()
export class CaseManagementService {
  constructor(
    @InjectRepository(Case)
    private caseRepository: Repository<Case>,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Party)
    private partyRepository: Repository<Party>,
    @InjectRepository(CaseEvent)
    private caseEventRepository: Repository<CaseEvent>,
    @InjectRepository(CaseDeadline)
    private caseDeadlineRepository: Repository<CaseDeadline>,
    @InjectRepository(CaseTeamMember)
    private caseTeamMemberRepository: Repository<CaseTeamMember>,
    private caseTransformer: CaseTransformer,
  ) {}

  async create(createCaseDto: CreateCaseDto): Promise<CaseResponseDto> {
    const client = await this.clientRepository.findOne({ where: { id: createCaseDto.clientId } });
    if (!client) {
      throw new NotFoundException(`Client with ID ${createCaseDto.clientId} not found`);
    }

    const newCase = this.caseRepository.create({
      ...createCaseDto,
      client,
    });

    const savedCase = await this.caseRepository.save(newCase);
    const fullCase = await this.caseRepository.findOne({
      where: { id: savedCase.id },
      relations: ['client', 'events', 'deadlines', 'teamMembers', 'teamMembers.user', 'parties'],
    });

    return this.caseTransformer.toResponseDto(fullCase);
  }

  async findAll(query: any): Promise<CaseListResponseDto[]> {
    const cases = await this.caseRepository.find({
      relations: ['client'],
      where: {
        ...(query.status && { status: query.status }),
        ...(query.priority && { priority: query.priority }),
        ...(query.clientId && { client: { id: query.clientId } }),
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return this.caseTransformer.toListResponseDtoArray(cases);
  }

  async findOne(id: string): Promise<CaseResponseDto> {
    const caseEntity = await this.caseRepository.findOne({
      where: { id },
      relations: ['client', 'events', 'deadlines', 'teamMembers', 'teamMembers.user', 'parties'],
    });
    
    if (!caseEntity) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }
    
    return this.caseTransformer.toResponseDto(caseEntity);
  }

  async update(id: string, updateCaseDto: UpdateCaseDto): Promise<CaseResponseDto> {
    const caseEntity = await this.caseRepository.findOne({
      where: { id },
      relations: ['client', 'events', 'deadlines', 'teamMembers', 'teamMembers.user', 'parties'],
    });

    if (!caseEntity) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }

    // Update the case entity with the new data
    Object.assign(caseEntity, updateCaseDto);
    
    const updatedCase = await this.caseRepository.save(caseEntity);
    return this.caseTransformer.toResponseDto(updatedCase);
  }

  async remove(id: string): Promise<void> {
    const result = await this.caseRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }
  }

  async findEvents(id: string): Promise<CaseEventResponseDto[]> {
    const events = await this.caseEventRepository.find({
      where: { case: { id } },
      order: { dateTime: 'DESC' },
    });
    return events.map(event => this.caseTransformer.toEventResponseDto(event));
  }

  async findDeadlines(id: string): Promise<CaseDeadlineResponseDto[]> {
    const deadlines = await this.caseDeadlineRepository.find({
      where: { case: { id } },
      order: { dueDate: 'ASC' },
    });
    return deadlines.map(deadline => this.caseTransformer.toDeadlineResponseDto(deadline));
  }

  async findTeam(id: string): Promise<CaseTeamMemberResponseDto[]> {
    const teamMembers = await this.caseTeamMemberRepository.find({
      where: { case: { id } },
      relations: ['user'],
    });
    return teamMembers.map(member => this.caseTransformer.toTeamMemberResponseDto(member));
  }

  async findParties(id: string): Promise<PartyResponseDto[]> {
    const parties = await this.partyRepository.find({
      where: { case: { id } },
    });
    return parties.map(party => this.caseTransformer.toPartyResponseDto(party));
  }

  async checkConflicts(id: string): Promise<any> {
    await this.findOne(id); // Verify case exists
    const parties = await this.findParties(id);
    
    // Implement conflict of interest check logic
    // This would involve checking if any parties in this case have relationships
    // with clients or parties in other cases that could create conflicts
    
    return {
      hasConflicts: false, // Placeholder - actual implementation would check for real conflicts
      potentialConflicts: [],
      checkDate: new Date(),
    };
  }
}
