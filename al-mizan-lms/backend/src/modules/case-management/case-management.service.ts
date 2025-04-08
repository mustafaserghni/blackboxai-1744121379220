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
  ) {}

  async create(createCaseDto: CreateCaseDto): Promise<Case> {
    const newCase = this.caseRepository.create(createCaseDto);
    return this.caseRepository.save(newCase);
  }

  async findAll(query: any): Promise<Case[]> {
    // Implement filtering based on query parameters
    return this.caseRepository.find({
      relations: ['client'],
      // Add filtering logic here based on query parameters
    });
  }

  async findOne(id: string): Promise<Case> {
    const caseEntity = await this.caseRepository.findOne({
      where: { id },
      relations: ['client', 'events', 'deadlines', 'teamMembers', 'parties'],
    });
    
    if (!caseEntity) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }
    
    return caseEntity;
  }

  async update(id: string, updateCaseDto: UpdateCaseDto): Promise<Case> {
    const caseEntity = await this.findOne(id);
    
    // Update the case with new data
    Object.assign(caseEntity, updateCaseDto);
    
    return this.caseRepository.save(caseEntity);
  }

  async remove(id: string): Promise<void> {
    const result = await this.caseRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }
  }

  async findEvents(id: string): Promise<CaseEvent[]> {
    const caseEntity = await this.findOne(id);
    return this.caseEventRepository.find({
      where: { case: { id: caseEntity.id } },
      order: { dateTime: 'DESC' },
    });
  }

  async findDeadlines(id: string): Promise<CaseDeadline[]> {
    const caseEntity = await this.findOne(id);
    return this.caseDeadlineRepository.find({
      where: { case: { id: caseEntity.id } },
      order: { dueDate: 'ASC' },
    });
  }

  async findTeam(id: string): Promise<CaseTeamMember[]> {
    const caseEntity = await this.findOne(id);
    return this.caseTeamMemberRepository.find({
      where: { case: { id: caseEntity.id } },
      relations: ['user'],
    });
  }

  async findParties(id: string): Promise<Party[]> {
    const caseEntity = await this.findOne(id);
    return this.partyRepository.find({
      where: { case: { id: caseEntity.id } },
    });
  }

  async checkConflicts(id: string): Promise<any> {
    const caseEntity = await this.findOne(id);
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
