import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Client } from './client.entity';
import { Party } from './party.entity';
import { CaseEvent } from './case-event.entity';
import { CaseDeadline } from './case-deadline.entity';
import { CaseTeamMember } from './case-team-member.entity';

export enum CaseStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  CLOSED = 'closed',
  ARCHIVED = 'archived',
}

export enum CasePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Entity('cases')
export class Case {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  caseNumber: string;

  @Column({ length: 255 })
  titleEn: string;

  @Column({ length: 255, nullable: true })
  titleAr: string;

  @Column({ length: 255, nullable: true })
  titleFr: string;

  @Column({ type: 'text', default: CaseStatus.ACTIVE })
  status: CaseStatus;

  @Column({ type: 'text', default: CasePriority.MEDIUM })
  priority: CasePriority;

  @Column({ type: 'text', nullable: true })
  descriptionEn: string;

  @Column({ type: 'text', nullable: true })
  descriptionAr: string;

  @Column({ type: 'text', nullable: true })
  descriptionFr: string;

  @Column({ length: 100, nullable: true })
  caseType: string;

  @Column({ length: 100, nullable: true })
  jurisdiction: string;

  @Column({ length: 100, nullable: true })
  court: string;

  @Column({ length: 100, nullable: true })
  judge: string;

  @Column({ type: 'date', nullable: true })
  filingDate: Date;

  @Column({ type: 'date', nullable: true })
  closingDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Client, client => client.cases)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @OneToMany(() => Party, party => party.case)
  parties: Party[];

  @OneToMany(() => CaseEvent, event => event.case)
  events: CaseEvent[];

  @OneToMany(() => CaseDeadline, deadline => deadline.case)
  deadlines: CaseDeadline[];

  @OneToMany(() => CaseTeamMember, teamMember => teamMember.case)
  teamMembers: CaseTeamMember[];
}
