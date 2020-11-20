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
  gender: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  invitationToken: string;

  @Column({ type: 'timestamptz' })
  notificationSeenAt: string;

  @Column({ type: 'timestamptz' })
  createdAt: string;
}