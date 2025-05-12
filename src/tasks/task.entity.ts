// src/tasks/task.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ default: 'pendiente' }) // estado: pendiente, en_progreso, completada
  estado: string;

  @CreateDateColumn()
  fecha_creacion: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @Column()
  user_id: number; // para facilitar consulta y permisos
}
