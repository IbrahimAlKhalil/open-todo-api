import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Gender {
  female = 'FEMALE',
  other = 'OTHER',
  male = 'MALE',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  invitationToken?: number | null;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  notificationSeenAt?: string;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  createdAt: string;
}