import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Case } from './case.entity';

export enum PartyType {
  PLAINTIFF = 'plaintiff',
  DEFENDANT = 'defendant',
  WITNESS = 'witness',
  EXPERT = 'expert',
  JUDGE = 'judge',
  PROSECUTOR = 'prosecutor',
  OTHER = 'other',
}

export enum PartyRole {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  THIRD_PARTY = 'third_party',
  WITNESS = 'witness',
  AUTHORITY = 'authority',
  OTHER = 'other',
}

@Entity('parties')
export class Party {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: PartyType })
  type: PartyType;

  @Column({ type: 'enum', enum: PartyRole, default: PartyRole.PRIMARY })
  role: PartyRole;

  @Column({ length: 255 })
  nameEn: string;

  @Column({ length: 255, nullable: true })
  nameAr: string;

  @Column({ length: 255, nullable: true })
  nameFr: string;

  @Column({ length: 255, nullable: true })
  representative: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ length: 50, nullable: true })
  phone: string;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ type: 'text', nullable: true })
  notesEn: string;

  @Column({ type: 'text', nullable: true })
  notesAr: string;

  @Column({ type: 'text', nullable: true })
  notesFr: string;

  @Column({ length: 100, nullable: true })
  identificationNumber: string;

  @Column({ length: 100, nullable: true })
  relationshipToClient: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Case, caseEntity => caseEntity.parties)
  @JoinColumn({ name: 'case_id' })
  case: Case;
}
