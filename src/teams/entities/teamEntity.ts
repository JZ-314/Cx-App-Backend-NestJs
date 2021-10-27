import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { SalesRep } from 'src/salesReps/entities/salesRepEntity';
import { User } from 'src/users/entity/userEntity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  userId: string;

  @ManyToOne(() => User, (user) => user.teams)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => SalesRep, (salesRep) => salesRep.team)
  salesReps: SalesRep[];

  @Column({ name: 'created_at', default: () => 'now()' })
  created_at?: Date;

  @Column({ name: 'updated_at', default: () => 'now()' })
  updated_at?: Date;
}
