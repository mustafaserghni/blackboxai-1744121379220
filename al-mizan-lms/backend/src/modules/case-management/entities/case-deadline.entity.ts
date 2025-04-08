import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Case } from './case.entity';

export enum DeadlineStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  OVERDUE = 'overdue',
  EXTENDED = 'extended',
  CANCELLED = 'cancelled',
}

export enum DeadlineType {
  FILING = 'filing',
  RESPONSE = 'response',
  HEARING = 'hearing',
  SUBMISSION = 'submission',
  PAYMENT = 'payment',
  OTHER = 'other',
}

@Entity('case_deadlines')
export class CaseDeadline {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: DeadlineType })
  type: DeadlineType;

  @Column({ length: 255 })
  titleEn: string;

  @Column({ length: 255, nullable: true })
  titleAr: string;

  @Column({ length: 255, nullable: true })
  titleFr: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'enum', enum: DeadlineStatus, default: DeadlineStatus.PENDING })
  status: DeadlineStatus;

  @Column({ type: 'text', nullable: true })
  descriptionEn: string;

  @Column({ type: 'text', nullable: true })
  descriptionAr: string;

  @Column({ type: 'text', nullable: true })
  descriptionFr: string;

  @Column({ length: 255, nullable: true })
  assignedTo: string;

  @Column({ type: 'int', nullable: true })
  reminderDays: number;

  @Column({ type: 'date', nullable: true })
  completedDate: Date;

  @Column({ type: 'date', nullable: true })
  extendedDate: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Case, caseEntity => caseEntity.deadlines)
  @JoinColumn({ name: 'case_id' })
  case: Case;
}
