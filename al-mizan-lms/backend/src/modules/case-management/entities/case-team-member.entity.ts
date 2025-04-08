import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Case } from './case.entity';

export enum TeamMemberRole {
  LEAD_ATTORNEY = 'lead_attorney',
  ASSOCIATE = 'associate',
  PARALEGAL = 'paralegal',
  ASSISTANT = 'assistant',
  CONSULTANT = 'consultant',
  OTHER = 'other',
}

@Entity('case_team_members')
export class CaseTeamMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  userId: string;

  @Column({ type: 'enum', enum: TeamMemberRole })
  role: TeamMemberRole;

  @Column({ type: 'text', nullable: true })
  responsibilities: string;

  @Column({ type: 'date' })
  assignedDate: Date;

  @Column({ type: 'date', nullable: true })
  removedDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Case, caseEntity => caseEntity.teamMembers)
  @JoinColumn({ name: 'case_id' })
  case: Case;

  // This would typically have a relation to a User entity
  // but we're keeping it simple with just a userId for now
}
