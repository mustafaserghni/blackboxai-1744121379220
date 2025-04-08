import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Case } from './case.entity';

export enum ClientType {
  INDIVIDUAL = 'individual',
  COMPANY = 'company',
  GOVERNMENT = 'government',
  NONPROFIT = 'nonprofit',
}

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', default: ClientType.INDIVIDUAL })
  type: ClientType;

  @Column({ length: 255 })
  nameEn: string;

  @Column({ length: 255, nullable: true })
  nameAr: string;

  @Column({ length: 255, nullable: true })
  nameFr: string;

  // Contact information
  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ length: 50, nullable: true })
  phone: string;

  @Column({ length: 50, nullable: true })
  mobile: string;

  // Address
  @Column({ length: 255, nullable: true })
  addressLine1: string;

  @Column({ length: 255, nullable: true })
  addressLine2: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({ length: 100, nullable: true })
  state: string;

  @Column({ length: 20, nullable: true })
  postalCode: string;

  @Column({ length: 100, nullable: true })
  country: string;

  // For companies
  @Column({ length: 100, nullable: true })
  companyRegistrationNumber: string;

  @Column({ length: 100, nullable: true })
  taxIdentificationNumber: string;

  @Column({ length: 100, nullable: true })
  industry: string;

  // For individuals
  @Column({ length: 100, nullable: true })
  nationalId: string;

  @Column({ length: 100, nullable: true })
  passportNumber: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ length: 20, nullable: true })
  gender: string;

  // Additional information
  @Column({ type: 'text', nullable: true })
  notesEn: string;

  @Column({ type: 'text', nullable: true })
  notesAr: string;

  @Column({ type: 'text', nullable: true })
  notesFr: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Case, caseEntity => caseEntity.client)
  cases: Case[];
}
