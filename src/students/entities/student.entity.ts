import { Class } from 'src/classes/entities/class.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, length: 255 })
  name: string;

  @Column({ nullable: false, length: 255 })
  gender: string;

  @ManyToOne(() => Class, (c) => c.student)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
