import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entity/userEntity';
import { Team } from 'src/teams/entities/teamEntity';

@Entity()
export class SalesRep {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'varchar' })
  userId: string;

  @ManyToOne(() => User, (user) => user.salesReps)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column({ type: 'varchar' })
  teamId: string;

  @ManyToOne(() => Team, (team) => team.salesReps)
  @JoinColumn({ name: 'teamId', referencedColumnName: 'id' })
  team: Team;

  @Column({ name: 'created_at', default: () => 'now()' })
  created_at?: Date;

  @Column({ name: 'updated_at', default: () => 'now()' })
  updated_at?: Date;
}
