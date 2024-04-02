import { Student } from 'src/students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'classes' })
export class Class {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, length: 255 })
  description: string;

  @OneToMany(() => Student, (student) => student.class)
  student: Student;

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
