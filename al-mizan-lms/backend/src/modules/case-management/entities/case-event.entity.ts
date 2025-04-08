import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Case } from './case.entity';

export enum EventType {
  HEARING = 'hearing',
  FILING = 'filing',
  MEETING = 'meeting',
  CALL = 'call',
  NOTE = 'note',
  OTHER = 'other',
}

@Entity('case_events')
export class CaseEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: EventType })
  type: EventType;

  @Column({ length: 255 })
  titleEn: string;

  @Column({ length: 255, nullable: true })
  titleAr: string;

  @Column({ length: 255, nullable: true })
  titleFr: string;

  @Column({ type: 'timestamp' })
  dateTime: Date;

  @Column({ type: 'text', nullable: true })
  descriptionEn: string;

  @Column({ type: 'text', nullable: true })
  descriptionAr: string;

  @Column({ type: 'text', nullable: true })
  descriptionFr: string;

  @Column({ length: 255, nullable: true })
  location: string;

  @Column({ length: 255, nullable: true })
  outcome: string;

  @Column({ length: 255, nullable: true })
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Case, caseEntity => caseEntity.events)
  @JoinColumn({ name: 'case_id' })
  case: Case;
}
