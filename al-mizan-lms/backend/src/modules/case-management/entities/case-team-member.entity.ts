import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Case } from './case.entity';
import { User } from '../../users/entities/user.entity';

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

  @Column({ type: 'text', default: TeamMemberRole.OTHER })
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

  @ManyToOne(() => User, user => user.teamMemberships)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
