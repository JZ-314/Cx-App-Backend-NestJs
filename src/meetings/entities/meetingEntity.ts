import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ name: 'start' })
  start: Date;

  @Column({ name: 'end' })
  end: Date;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ name: 'created_at', default: () => 'now()' })
  created_at?: Date;

  @Column({ name: 'updated_at', default: () => 'now()' })
  updated_at?: Date;
}
